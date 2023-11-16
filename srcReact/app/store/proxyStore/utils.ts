import { globalProxyStateMap, globalSnapCache } from './config'
import { TKeyPath } from './types'

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

export function createSnapshot(target: PlainObject, version: number): any {
	const cache: PlainObject = globalSnapCache.get(target)
	if (cache?.[0] === version) {
		return cache[1]
	}
	const snap: PlainObject = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target))
	globalSnapCache.set(target, [version, snap])
	Reflect.ownKeys(target).forEach((key: TKeyPath): void => {
		if (Object.getOwnPropertyDescriptor(snap, key)) {
			return
		}
		const value: any = Reflect.get(target, key)
		const descriptor: PlainObject = {
			value,
			enumerable: true,
			configurable: true,
		}
		if (globalProxyStateMap.has(value)) {
			const [target] = globalProxyStateMap.get(value)
			descriptor.value = createSnapshot(target, version)
		}
		Object.defineProperty(snap, key, descriptor)
	})
	return Object.preventExtensions(snap)
}

export function subscribe(proxyObject: PlainObject, callback: (val: any) => void): () => void {
	const proxyState = globalProxyStateMap.get(proxyObject)
	const ops: Array<any> = []
	const addListener = proxyState[3]
	// let isListenerActive: boolean = false
	const removeListener = addListener((op: any): void => {
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
	const proxyState = globalProxyStateMap.get(proxyObject)
	const [target, ensureVersion, createSnapshot] = proxyState
	return createSnapshot(target, ensureVersion())
}
