import { TKeyPath } from './types'
import { isObject } from './utils'

const TRACK_MEMO_SYMBOL: unique symbol = Symbol()
const GET_ORIGINAL_SYMBOL: unique symbol = Symbol()

const AFFECTED_PROPERTY: string = 'a'
const IS_TARGET_COPIED_PROPERTY: string = 'f'
const PROXY_PROPERTY: string = 'p'
const PROXY_CACHE_PROPERTY: string = 'c'
const TARGET_CACHE_PROPERTY: string = 't'
const NEXT_OBJECT_PROPERTY: string = 'n'
const CHANGED_PROPERTY: string = 'g'
const HAS_KEY_PROPERTY: string = 'h'
const ALL_OWN_KEYS_PROPERTY: string = 'w'
const HAS_OWN_KEY_PROPERTY: string = 'o'
const KEYS_PROPERTY: string = 'k'

const objectsToTrack: WeakMap<object, boolean> = new WeakMap<object, boolean>()

function isAllOwnKeysChanged(prevObject: PlainObject, nextObject: PlainObject): boolean {
	const prevKeys: Array<TKeyPath> = Reflect.ownKeys(prevObject)
	const nextKeys: Array<TKeyPath> = Reflect.ownKeys(nextObject)
	return (
		prevKeys.length !== nextKeys.length ||
		prevKeys.some((k: TKeyPath, i: number): boolean => {
			return k !== nextKeys[i]
		})
	)
}

function isObjectToTrack<T>(object: T): object is T extends object ? T : never {
	return (
		object &&
		(objectsToTrack.has(object as unknown as object)
			? (objectsToTrack.get(object as unknown as object) as boolean)
			: Object.getPrototypeOf(object) === Object.prototype || Object.getPrototypeOf(object) === Array.prototype)
	)
}

function getOriginalObject<T extends object>(object: T): PlainObject {
	return (object as { [GET_ORIGINAL_SYMBOL]?: typeof object })[GET_ORIGINAL_SYMBOL] || object
}

function needsToCopyTargetObject(object: PlainObject): boolean {
	return Object.values(Object.getOwnPropertyDescriptors(object)).some(descriptor => !descriptor.configurable && !descriptor.writable)
}

function copyTargetObject<T extends object>(obj: T): T {
	if (Array.isArray(obj)) {
		return Array.from(obj) as T
	}
	const descriptors = Object.getOwnPropertyDescriptors(obj)
	Object.values(descriptors).forEach(desc => {
		desc.configurable = true
	})
	return Object.create(Object.getPrototypeOf(obj), descriptors)
}

function createProxyHandler<T extends object>(origObj: T, isTargetCopied: boolean): any {
	const state: PlainObject = {
		[IS_TARGET_COPIED_PROPERTY]: isTargetCopied,
	}
	let trackObject: boolean = false
	const recordUsage = (
		type: typeof HAS_KEY_PROPERTY | typeof ALL_OWN_KEYS_PROPERTY | typeof HAS_OWN_KEY_PROPERTY | typeof KEYS_PROPERTY,
		key?: TKeyPath
	): void => {
		if (!trackObject) {
			let used: PlainObject = state[AFFECTED_PROPERTY].get(origObj)
			if (!used) {
				used = {}
				state[AFFECTED_PROPERTY].set(origObj, used)
			}
			if (type === ALL_OWN_KEYS_PROPERTY) {
				used[ALL_OWN_KEYS_PROPERTY] = true
			} else {
				let set: Set<TKeyPath> = used[type]
				if (!set) {
					set = new Set()
					used[type] = set
				}
				set.add(key as TKeyPath)
			}
		}
	}
	const recordObjectAsUsed = (): void => {
		trackObject = true
		state[AFFECTED_PROPERTY].delete(origObj)
	}
	const handler: ProxyHandler<T> = {
		get(target: PlainObject, key: TKeyPath): any {
			if (key === GET_ORIGINAL_SYMBOL) {
				return origObj
			}
			recordUsage(KEYS_PROPERTY, key)
			return createProxyToCompare(Reflect.get(target, key), state[AFFECTED_PROPERTY], state[PROXY_CACHE_PROPERTY], state[TARGET_CACHE_PROPERTY])
		},
		has(target: PlainObject, key: TKeyPath): boolean {
			if (key === TRACK_MEMO_SYMBOL) {
				recordObjectAsUsed()
				return true
			}
			recordUsage(HAS_KEY_PROPERTY, key)
			return Reflect.has(target, key)
		},
		getOwnPropertyDescriptor(target: PlainObject, key: TKeyPath): PropertyDescriptor {
			recordUsage(HAS_OWN_KEY_PROPERTY, key)
			return Reflect.getOwnPropertyDescriptor(target, key) as PropertyDescriptor
		},
		ownKeys(target: PlainObject): Array<TKeyPath> {
			recordUsage(ALL_OWN_KEYS_PROPERTY)
			return Reflect.ownKeys(target)
		},
	}
	if (isTargetCopied) {
		handler.set = handler.deleteProperty = (): boolean => {
			return false
		}
	}
	return [handler, state]
}

export function isChanged(
	prevObject: PlainObject,
	nextObject: PlainObject,
	affected: WeakMap<object, PlainObject>,
	cache: WeakMap<object, PlainObject> = new WeakMap()
): boolean {
	if (Object.is(prevObject, nextObject)) {
		return false
	}
	if (!isObject(prevObject) || !isObject(nextObject)) {
		return true
	}
	const used: PlainObject = affected.get(getOriginalObject(prevObject)) as PlainObject
	if (!used) {
		return true
	}
	if (cache) {
		const hit: PlainObject = cache.get(prevObject) as PlainObject
		if (hit && hit[NEXT_OBJECT_PROPERTY] === nextObject) {
			return hit[CHANGED_PROPERTY]
		}
		cache.set(prevObject, {
			[NEXT_OBJECT_PROPERTY]: nextObject,
			[CHANGED_PROPERTY]: false,
		})
	}
	let changed: boolean = null!
	try {
		for (const key of used[HAS_KEY_PROPERTY] || []) {
			changed = Reflect.has(prevObject, key) !== Reflect.has(nextObject, key)
			if (changed) {
				return changed
			}
		}
		if (used[ALL_OWN_KEYS_PROPERTY] === true) {
			changed = isAllOwnKeysChanged(prevObject, nextObject)
			if (changed) {
				return changed
			}
		} else {
			for (const key of used[HAS_OWN_KEY_PROPERTY] || []) {
				const hasPrev = !!Reflect.getOwnPropertyDescriptor(prevObject, key)
				const hasNext = !!Reflect.getOwnPropertyDescriptor(nextObject, key)
				changed = hasPrev !== hasNext
				if (changed) {
					return changed
				}
			}
		}
		for (const key of used[KEYS_PROPERTY] || []) {
			changed = isChanged((prevObject as any)[key], (nextObject as any)[key], affected, cache)
			if (changed) {
				return changed
			}
		}
		if (changed === null) {
			changed = true
		}
		return changed
	} finally {
		if (cache) {
			cache.set(prevObject, {
				[NEXT_OBJECT_PROPERTY]: nextObject,
				[CHANGED_PROPERTY]: changed,
			})
		}
	}
}

export function createProxyToCompare(
	object: PlainObject,
	affected: WeakMap<object, any>,
	proxyCache?: WeakMap<object, any>,
	targetCache?: WeakMap<object, any>
): PlainObject {
	// if (!isObjectToTrack(object)) {
	//     return object
	// }
	if (!isObject(object)) {
		return object
	}
	let targetAndCopied = targetCache && targetCache.get(object)
	if (!targetAndCopied) {
		const target = getOriginalObject(object)
		if (needsToCopyTargetObject(target)) {
			targetAndCopied = [target, copyTargetObject(target)]
		} else {
			targetAndCopied = [target]
		}
		targetCache && targetCache.set(object, targetAndCopied)
	}
	const [target, copiedTarget] = targetAndCopied
	let handlerAndState = proxyCache && proxyCache.get(target)
	if (!handlerAndState || handlerAndState[1][IS_TARGET_COPIED_PROPERTY] !== !!copiedTarget) {
		handlerAndState = createProxyHandler<typeof target>(target, !!copiedTarget)
		handlerAndState[1][PROXY_PROPERTY] = new Proxy(copiedTarget || target, handlerAndState[0])
		if (proxyCache) {
			proxyCache.set(target, handlerAndState)
		}
	}
	handlerAndState[1][AFFECTED_PROPERTY] = affected
	handlerAndState[1][PROXY_CACHE_PROPERTY] = proxyCache
	handlerAndState[1][TARGET_CACHE_PROPERTY] = targetCache
	return handlerAndState[1][PROXY_PROPERTY]
}
