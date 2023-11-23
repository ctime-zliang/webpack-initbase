import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import { snapshot, subscribe } from './utils'
import type { TSnapshot } from './types'
import { createProxyToCompare, isChanged } from './proxyCompare'

const targetCache: WeakMap<object, any> = new WeakMap()

const testSet = new Set()

export function useSnapshot<T extends object>(proxyObject: T): any {
	const currSnapshot = useSyncExternalStore(
		(callback: () => void): (() => void) => {
			const unsub = subscribe(proxyObject, (): void => {
				callback()
			})
			return unsub
		},
		(): PlainObject => {
			const nextSnapshot: PlainObject = snapshot(proxyObject)
			if (!testSet.has(nextSnapshot)) {
				testSet.add(nextSnapshot)
			}
			return nextSnapshot
		}
	)
	return currSnapshot
}
