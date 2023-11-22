import { globalProxyObjectHandlerMap, globalSnapCache } from './config'
import { TKeyPath, TMarkOperationStructureItem, TProxyObjectHandlerItem, TSnapCacheItem } from './types'

export function isObject(val: any): boolean {
	return typeof val === 'object' && val !== null
}

export function canProxy(val: any): boolean {
	return (
		isObject(val) &&
		(Array.isArray(val) || !(Symbol.iterator in val)) &&
		!(val instanceof WeakMap) &&
		!(val instanceof WeakSet) &&
		!(val instanceof Error) &&
		!(val instanceof Number) &&
		!(val instanceof Date) &&
		!(val instanceof String) &&
		!(val instanceof RegExp) &&
		!(val instanceof ArrayBuffer)
	)
}

export function createSnapshot(data: PlainObject, version: number): PlainObject {
	const snapCacheItem: TSnapCacheItem = globalSnapCache.get(data) as TSnapCacheItem
	if (snapCacheItem && snapCacheItem[0] === version) {
		return snapCacheItem[1]
	}
	const snapCacheData: PlainObject = Array.isArray(data) ? [] : Object.create(Object.getPrototypeOf(data))
	globalSnapCache.set(data, [version, snapCacheData])
	const ownKeys: Array<TKeyPath> = Reflect.ownKeys(data)
	ownKeys.forEach((propKey: TKeyPath): void => {
		if (Object.getOwnPropertyDescriptor(snapCacheData, propKey)) {
			return
		}
		const value: any = Reflect.get(data, propKey)
		const descriptor: PlainObject = {
			value,
			enumerable: true,
			configurable: true,
		}
		if (globalProxyObjectHandlerMap.has(value)) {
			const proxyObjectHandlerItem: TProxyObjectHandlerItem = globalProxyObjectHandlerMap.get(value) as TProxyObjectHandlerItem
			const { data } = proxyObjectHandlerItem
			descriptor.value = createSnapshot(data, version)
		}
		Object.defineProperty(snapCacheData, propKey, descriptor)
	})
	return Object.preventExtensions(snapCacheData)
}

export function subscribe(
	proxyObject: PlainObject,
	callback: (val: Array<TMarkOperationStructureItem>) => void,
	notifyInSync: boolean = false
): () => void {
	const proxyObjectHandlerItem: TProxyObjectHandlerItem = globalProxyObjectHandlerMap.get(proxyObject) as TProxyObjectHandlerItem
	const ops: Array<TMarkOperationStructureItem> = []
	let promise: Promise<void> | undefined
	let isListenerActive: boolean = false
	const listener = (op: TMarkOperationStructureItem): void => {
		ops.push(op)
		if (notifyInSync) {
			callback(ops.splice(0))
			return
		}
		if (!promise) {
			promise = Promise.resolve().then((): void => {
				promise = undefined
				if (isListenerActive) {
					callback(ops.splice(0))
				}
			})
		}
	}
	const removeListener = proxyObjectHandlerItem.addListener(listener)
	isListenerActive = true
	return (): void => {
		isListenerActive = false
		removeListener()
	}
}

export function snapshot(proxyObject: PlainObject) {
	const proxyObjectHandlerItem: TProxyObjectHandlerItem = globalProxyObjectHandlerMap.get(proxyObject) as TProxyObjectHandlerItem
	const { data, ensureVersion, createSnapshot } = proxyObjectHandlerItem
	return createSnapshot(data, ensureVersion())
}
