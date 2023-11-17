import { globalProxyObjectHandlerMap, globalSnapCache } from './config'
import { TKeyPath, TProxyObjectHandlerItem } from './types'

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

export function createSnapshot(target: PlainObject, version: number): PlainObject {
	const cache: PlainObject = globalSnapCache.get(target)
	if (cache?.[0] === version) {
		return cache[1]
	}
	const snap: PlainObject = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target))
	globalSnapCache.set(target, [version, snap])
	Reflect.ownKeys(target).forEach((propKey: TKeyPath): void => {
		if (Object.getOwnPropertyDescriptor(snap, propKey)) {
			return
		}
		const value: any = Reflect.get(target, propKey)
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
		Object.defineProperty(snap, propKey, descriptor)
	})
	return Object.preventExtensions(snap)
}

export function subscribe(proxyObject: PlainObject, callback: (val: any) => void): () => void {
	const proxyObjectHandlerItem: TProxyObjectHandlerItem = globalProxyObjectHandlerMap.get(proxyObject) as TProxyObjectHandlerItem
	const ops: Array<any> = []
	// let isListenerActive: boolean = false
	const removeListener = proxyObjectHandlerItem.addListener((op: any): void => {
		ops.push(op)
		callback(ops.splice(0))
	})
	// isListenerActive = true
	return (): void => {
		// isListenerActive = false
		removeListener()
	}
}

export function snapshot(proxyObject: PlainObject) {
	const proxyObjectHandlerItem: TProxyObjectHandlerItem = globalProxyObjectHandlerMap.get(proxyObject) as TProxyObjectHandlerItem
	const { data, ensureVersion, createSnapshot } = proxyObjectHandlerItem
	return createSnapshot(data, ensureVersion())
}
