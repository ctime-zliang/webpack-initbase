import { EMarkOperation, globalProxyObjectHandlerMap, markVersionHolder } from './config'
import { TKeyPath, TListenerHandler, TMarkOperationStructureItem, TProxyObjectHandlerItem } from './types'
import { createSnapshot, isObject } from './utils'

export class ProxyStore {
	private parent: ProxyStore
	private _initialObject: PlainObject
	private _nowVersion: number
	private _checkVersion: number
	private _listeners: Set<TListenerHandler>
	private _proxyObject: PlainObject
	private _childMap: Map<string, ProxyStore>
	private _proxyObjectHandlerItem: TProxyObjectHandlerItem
	constructor(initialObject: PlainObject, parent?: ProxyStore) {
		this.parent = parent || null!
		this._initialObject = initialObject
		this._nowVersion = markVersionHolder[0]
		this._checkVersion = markVersionHolder[1]
		this._listeners = new Set()
		this._proxyObject = null!
		this._childMap = new Map()
		this._proxyObjectHandlerItem = null!
		this.initial()
	}

	private initial(): void {
		if (!isObject(this._initialObject)) {
			throw new Error('need object.')
		}
		const localObject: PlainObject = Array.isArray(this._initialObject) ? [] : Object.create(Object.getPrototypeOf(this._initialObject))
		const proxyObject: PlainObject = new Proxy(localObject, this.createProxyHandler())
		const proxyObjectHandlerItem: TProxyObjectHandlerItem = {
			data: this._initialObject,
			createSnapshot,
			ensureVersion: this.ensureVersion.bind(this),
			addListener: this.addListener.bind(this),
			listenerRemove: null!,
		}
		globalProxyObjectHandlerMap.set(proxyObject, proxyObjectHandlerItem)
		const ownKeys: Array<TKeyPath> = Reflect.ownKeys(this._initialObject)
		for (let i: number = 0; i < ownKeys.length; i++) {
			const propKey: TKeyPath = ownKeys[i]
			const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(this._initialObject, propKey) as PropertyDescriptor
			if (descriptor.get || descriptor.set) {
				Object.defineProperty(localObject, propKey, descriptor)
				continue
			}
			proxyObject[propKey as string] = this._initialObject[propKey as keyof PlainObject]
		}
		this._proxyObject = proxyObject
		this._proxyObjectHandlerItem = proxyObjectHandlerItem
	}

	public get proxyObject(): any {
		return this._proxyObject
	}

	private get proxyObjectHandlerItem(): TProxyObjectHandlerItem {
		return this._proxyObjectHandlerItem
	}

	private notifyUpdate(op: TMarkOperationStructureItem, nextVersion: number = ++markVersionHolder[0]): void {
		this._nowVersion = nextVersion
		this._listeners.forEach((listener: TListenerHandler): void => {
			listener(op)
		})
	}

	private ensureVersion(nextCheckVersion: number = ++markVersionHolder[1]): number {
		if (this._checkVersion !== nextCheckVersion && !this._listeners.size) {
			this._checkVersion = nextCheckVersion
			this._childMap.forEach((childProxyStore: ProxyStore, key: string): void => {
				const propProxyObjectHandlerItem: TProxyObjectHandlerItem = childProxyStore._proxyObjectHandlerItem
				const propVersion: number = propProxyObjectHandlerItem.ensureVersion(nextCheckVersion)
				if (propVersion > this._nowVersion) {
					this._nowVersion = propVersion
				}
			})
		}
		return this._nowVersion
	}

	private addPropListener(propKey: string, proxyObjectHandlerItem: TProxyObjectHandlerItem): void {
		if (this._listeners.size) {
			const listenerRemove = proxyObjectHandlerItem.addListener((op: TMarkOperationStructureItem): void => {
				const newOp: TMarkOperationStructureItem = [...op]
				newOp[1] = [propKey, ...newOp[1]]
				this.notifyUpdate(newOp)
			})
			proxyObjectHandlerItem.listenerRemove = listenerRemove
			return
		}
	}

	private removePropListener(propKey: string): void {
		if (!this._childMap.has(propKey)) {
			return
		}
		const proxyObjectHandlerItem: TProxyObjectHandlerItem = (this._childMap.get(propKey) as ProxyStore)._proxyObjectHandlerItem
		if (proxyObjectHandlerItem.listenerRemove instanceof Function) {
			proxyObjectHandlerItem.listenerRemove()
		}
		this._childMap.delete(propKey)
	}

	private addListener(listener: TListenerHandler): () => void {
		this._listeners.add(listener)
		if (this._listeners.size === 1) {
			this._childMap.forEach((childProxyStore: ProxyStore, key: string): void => {
				const propProxyObjectHandlerItem: TProxyObjectHandlerItem = childProxyStore._proxyObjectHandlerItem
				const listenerRemove = propProxyObjectHandlerItem.addListener((op: TMarkOperationStructureItem): void => {
					const newOp: TMarkOperationStructureItem = [...op]
					newOp[1] = [key, ...newOp[1]]
					this.notifyUpdate(newOp)
				})
				propProxyObjectHandlerItem.listenerRemove = listenerRemove
			})
		}
		return (): void => {
			this._listeners.delete(listener)
			if (this._listeners.size <= 0) {
				this._childMap.forEach((childProxyStore: ProxyStore): void => {
					const propProxyObjectHandlerItem: TProxyObjectHandlerItem = childProxyStore._proxyObjectHandlerItem
					if (propProxyObjectHandlerItem.listenerRemove instanceof Function) {
						propProxyObjectHandlerItem.listenerRemove()
						propProxyObjectHandlerItem.listenerRemove = null!
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
					self.notifyUpdate([EMarkOperation.DELETE, [prop], undefined, prevValue])
				}
				return deleted
			},
			set(target: PlainObject, prop: string, value: any, receiver: ProxyHandler<PlainObject>): any | boolean {
				const hasPrev: boolean = Reflect.has(target, prop)
				const oldValue: any = Reflect.get(target, prop, receiver)
				if (hasPrev && oldValue === value) {
					return true
				}
				self.removePropListener(prop)
				let newValue: any = value
				if (isObject(newValue) && !globalProxyObjectHandlerMap.has(newValue)) {
					const childProxyStore: ProxyStore = new ProxyStore(newValue, self)
					self._childMap.set(prop, childProxyStore)
					newValue = childProxyStore.proxyObject
					self.addPropListener(prop, childProxyStore.proxyObjectHandlerItem)
				}
				const res: boolean = Reflect.set(target, prop, newValue, receiver)
				self.notifyUpdate([EMarkOperation.SET, [prop], value, oldValue])
				return res
			},
		}
	}
}
