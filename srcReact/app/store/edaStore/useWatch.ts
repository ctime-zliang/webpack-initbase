import { useLayoutEffect, useState } from 'react'
import { EdaAbstractStore } from './EdaAbstractStore'

export function useWatch(store: EdaAbstractStore, callback?: () => Promise<boolean> | boolean): void {
	const [, setState] = useState<number>(0)
	useLayoutEffect(store.createEffect(setState, callback), [])
}
