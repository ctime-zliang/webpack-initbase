import { useLayoutEffect, useState } from 'react'
import { EdaAbstractStore, TTriggerItemCallback } from './EdaAbstractStore'

export function useWatch(store: EdaAbstractStore, callback?: TTriggerItemCallback): void {
	const [, setState] = useState<number>(0)
	useLayoutEffect(store.createEffect(setState, callback))
}
