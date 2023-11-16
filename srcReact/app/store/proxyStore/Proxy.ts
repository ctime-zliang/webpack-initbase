import { globalProxyStateMap, versionHolder } from './config'
import { TKeyPath, TListenerHandler, TPropProxyStateItem } from './types'
import { createSnapshot, isObject } from './utils'

export class ProxyStore {
	private _initialObject: PlainObject
	private _nowVersion: number
	private _checkVersion: number
	private _listeners: Set<TListenerHandler>
	private _propProxyStates: Map<string, TPropProxyStateItem>
	constructor(initialObject: PlainObject) {
		this._initialObject = initialObject
		this._nowVersion = versionHolder[0]
		this._checkVersion = versionHolder[1]
		this._listeners = new Set()
		this._propProxyStates = new Map()
	}

	public create(): any {
		if (!isObject(this._initialObject)) {
			throw new Error('need object')
		}
		const localObject: PlainObject = Array.isArray(this._initialObject) ? [] : Object.create(Object.getPrototypeOf(this._initialObject))
		const proxyObject: PlainObject = new Proxy(localObject, this.createProxyHandler())
		const ownKeys: Array<TKeyPath> = Reflect.ownKeys(this._initialObject)
		const proxyState = [this._initialObject, this.ensureVersion.bind(this), createSnapshot, this.addListener.bind(this)]
		globalProxyStateMap.set(proxyObject, proxyState)
		for (let i: number = 0; i < ownKeys.length; i++) {
			const key: TKeyPath = ownKeys[i]
			const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(this._initialObject, key) as PropertyDescriptor
			if (descriptor.get || descriptor.set) {
				Object.defineProperty(localObject, key, descriptor)
				continue
			}
			proxyObject[key as string] = this._initialObject[key as keyof PlainObject]
		}
		return proxyObject
	}

	private notifyUpdate(op: Array<any>, nextVersion: number = ++versionHolder[0]): void {
		if (this._nowVersion !== nextVersion) {
			this._nowVersion = nextVersion
			this._listeners.forEach((listener: TListenerHandler): void => {
				listener(op)
			})
		}
	}

	private ensureVersion(nextCheckVersion: number = ++versionHolder[0]): number {
		if (this._checkVersion !== nextCheckVersion && !this._listeners.size) {
			this._checkVersion = nextCheckVersion
			this._propProxyStates.forEach(([propProxyStateItem]): void => {
				const propVersion: number = propProxyStateItem[1](nextCheckVersion)
				if (propVersion > this._nowVersion) {
					this._nowVersion = propVersion
				}
			})
		}
		return this._nowVersion
	}

	private createPropListener(prop: string): (op: Array<any>) => void {
		return (op: Array<any>): void => {
			const newOp: Array<any> = [...op]
			newOp[1] = [prop, ...newOp[1]]
			this.notifyUpdate(newOp)
		}
	}

	private addPropListener(prop: string, propProxyStateItem: any): void {
		if (this._listeners.size) {
			const remove = propProxyStateItem[3](this.createPropListener(prop))
			this._propProxyStates.set(prop, [propProxyStateItem, remove])
			return
		}
		this._propProxyStates.set(prop, [propProxyStateItem])
	}

	private removePropListener(prop: string): void {
		const entry = this._propProxyStates.get(prop)
		if (entry) {
			this._propProxyStates.delete(prop)
			entry[1]?.()
		}
	}

	private addListener(listener: TListenerHandler): () => void {
		this._listeners.add(listener)
		if (this._listeners.size <= 1) {
			this._propProxyStates.forEach(([proxyState, prevRemove], prop): void => {
				const remove = proxyState[3](this.createPropListener(prop))
				this._propProxyStates.set(prop, [proxyState, remove])
			})
		}
		return (): void => {
			this._listeners.delete(listener)
			if (this._listeners.size <= 0) {
				this._propProxyStates.forEach(([propProxyState, remove], prop): void => {
					if (remove) {
						remove()
						this._propProxyStates.set(prop, [propProxyState])
					}
				})
			}
		}
	}

	private createProxyHandler(): object {
		const self = this
		return {
			deleteProperty(target: PlainObject, prop: string): boolean {
				const prevValue = Reflect.get(target, prop)
				self.removePropListener(prop)
				const deleted: boolean = Reflect.deleteProperty(target, prop)
				if (deleted) {
					self.notifyUpdate(['delete', [prop], prevValue])
				}
				return deleted
			},
			set(target: PlainObject, prop: string, value: any, receiver: any): any | boolean {
				const hasPrev: boolean = Reflect.has(target, prop)
				const prevValue: any = Reflect.get(target, prop, receiver)
				if (hasPrev && prevValue === value) {
					return true
				}
				self.removePropListener(prop)
				let newValue: any = value
				if (!globalProxyStateMap.get(value) && isObject(value)) {
					newValue = new ProxyStore(value).create()
				}
				const childState = globalProxyStateMap.get(newValue)
				if (childState) {
					self.addPropListener(prop, childState)
				}
				const res: boolean = Reflect.set(target, prop, newValue, receiver)
				self.notifyUpdate(['set', [prop], newValue, prevValue])
				return res
			},
		}
	}
}
