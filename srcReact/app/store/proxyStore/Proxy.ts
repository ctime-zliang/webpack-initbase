import { EMarkOperation, globalProxyObjectHandlerMap, versionHolder } from './config'
import { TKeyPath, TListenerHandler, TMarkOperationStructureItem, TPropProxyObjectHandlerItem, TProxyObjectHandlerItem } from './types'
import { createSnapshot, isObject } from './utils'

export class ProxyStore {
	private parent: ProxyStore
	private _initialObject: PlainObject
	private _nowVersion: number
	private _checkVersion: number
	private _listeners: Set<TListenerHandler>
	private _childPropProxyObjectHandlerMap: Map<string, TPropProxyObjectHandlerItem>
	constructor(initialObject: PlainObject, parent?: ProxyStore) {
		this.parent = parent || null!
		this._initialObject = initialObject
		this._nowVersion = versionHolder[0]
		this._checkVersion = versionHolder[1]
		this._listeners = new Set()
		this._childPropProxyObjectHandlerMap = new Map()
	}

	public create(): any {
		if (!isObject(this._initialObject)) {
			throw new Error('need object')
		}
		const localObject: PlainObject = Array.isArray(this._initialObject) ? [] : Object.create(Object.getPrototypeOf(this._initialObject))
		const proxyObject: PlainObject = new Proxy(localObject, this.createProxyHandler())
		/**
		 * 获取对象 key 列表(不包含深层 key)
		 */
		const ownKeys: Array<TKeyPath> = Reflect.ownKeys(this._initialObject)
		const proxyObjectHandlerItem: TProxyObjectHandlerItem = {
			hostInstance: this,
			/* ... */
			data: this._initialObject,
			createSnapshot,
			ensureVersion: this.ensureVersion.bind(this),
			addListener: this.addListener.bind(this),
		}
		globalProxyObjectHandlerMap.set(proxyObject, proxyObjectHandlerItem)
		for (let i: number = 0; i < ownKeys.length; i++) {
			const propKey: TKeyPath = ownKeys[i]
			const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(this._initialObject, propKey) as PropertyDescriptor
			if (descriptor.get || descriptor.set) {
				Object.defineProperty(localObject, propKey, descriptor)
				continue
			}
			proxyObject[propKey as string] = this._initialObject[propKey as keyof PlainObject]
		}
		return proxyObject
	}

	private notifyUpdate(op: TMarkOperationStructureItem, nextVersion: number = ++versionHolder[0]): void {
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
			this._childPropProxyObjectHandlerMap.forEach((propProxyObjectHandlerItem: TPropProxyObjectHandlerItem, propKey: string): void => {
				const proxyObjectHandlerItem: TProxyObjectHandlerItem = propProxyObjectHandlerItem.handlerItem as TProxyObjectHandlerItem
				const propVersion: number = proxyObjectHandlerItem.ensureVersion(nextCheckVersion)
				if (propVersion > this._nowVersion) {
					this._nowVersion = propVersion
				}
			})
		}
		return this._nowVersion
	}

	private addPropListener(propKey: string, proxyObjectHandlerItem: TProxyObjectHandlerItem): void {
		if (this._listeners.size) {
			const remove = proxyObjectHandlerItem.addListener((op: TMarkOperationStructureItem): void => {
				const newOp: TMarkOperationStructureItem = [...op]
				newOp[1] = [propKey, ...newOp[1]]
				this.notifyUpdate(newOp)
			})
			this._childPropProxyObjectHandlerMap.set(propKey, {
				handlerItem: proxyObjectHandlerItem,
				listenerRemove: remove,
			})
			return
		}
		this._childPropProxyObjectHandlerMap.set(propKey, {
			handlerItem: proxyObjectHandlerItem,
			listenerRemove: null!,
		})
	}

	private removePropListener(propKey: string): void {
		const propProxyObjectHandlerItem: TPropProxyObjectHandlerItem = this._childPropProxyObjectHandlerMap.get(
			propKey
		) as TPropProxyObjectHandlerItem
		if (propProxyObjectHandlerItem) {
			this._childPropProxyObjectHandlerMap.delete(propKey)
			propProxyObjectHandlerItem.listenerRemove && propProxyObjectHandlerItem.listenerRemove()
		}
	}

	private addListener(listener: TListenerHandler): () => void {
		this._listeners.add(listener)
		if (this._listeners.size <= 1) {
			this._childPropProxyObjectHandlerMap.forEach((propProxyObjectHandlerItem: TPropProxyObjectHandlerItem, propKey: string): void => {
				const proxyObjectHandlerItem: TProxyObjectHandlerItem = propProxyObjectHandlerItem.handlerItem as TProxyObjectHandlerItem
				const listenerRemove = proxyObjectHandlerItem.addListener((op: TMarkOperationStructureItem): void => {
					const newOp: TMarkOperationStructureItem = [...op]
					newOp[1] = [propKey, ...newOp[1]]
					this.notifyUpdate(newOp)
				})
				this._childPropProxyObjectHandlerMap.set(propKey, {
					handlerItem: proxyObjectHandlerItem,
					listenerRemove,
				})
			})
		}
		return (): void => {
			this._listeners.delete(listener)
			if (this._listeners.size <= 0) {
				this._childPropProxyObjectHandlerMap.forEach((propProxyObjectHandlerItem: TPropProxyObjectHandlerItem, propKey: string): void => {
					const proxyObjectHandlerItem: TProxyObjectHandlerItem = propProxyObjectHandlerItem.handlerItem as TProxyObjectHandlerItem
					const listenerRemove = propProxyObjectHandlerItem.listenerRemove
					if (listenerRemove) {
						listenerRemove()
						this._childPropProxyObjectHandlerMap.set(propKey, {
							handlerItem: proxyObjectHandlerItem,
							listenerRemove: null!,
						})
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
					self.notifyUpdate([EMarkOperation.DELETE, [prop], prevValue, undefined])
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
				if (isObject(newValue) && !globalProxyObjectHandlerMap.get(newValue)) {
					newValue = new ProxyStore(newValue, self).create()
				}
				const proxyObjectHandlerItem: TProxyObjectHandlerItem = globalProxyObjectHandlerMap.get(newValue) as TProxyObjectHandlerItem
				if (proxyObjectHandlerItem) {
					self.addPropListener(prop, proxyObjectHandlerItem)
				}
				const res: boolean = Reflect.set(target, prop, newValue, receiver)
				self.notifyUpdate([EMarkOperation.SET, [prop], newValue, oldValue])
				return res
			},
		}
	}
}
