import { TUseStore } from '.'
import { cleanupListeners } from './cleanupListeners'

export type TListenerEffectItem = {
	state: any
	run?: (a: any) => any
}

export function newListenerEffect(store: TUseStore, oldState: any, mapState: any, originalHook: (v: any) => void | ((v: any) => any)): void {
	const newListenerItem: TListenerEffectItem = {
		state: oldState,
		run: undefined,
	}
	newListenerItem.run = mapState
		? (newState: any): void => {
				const state: any = mapState(newState)
				if (state !== newListenerItem.state) {
					newListenerItem.state = state
					originalHook(newState)
				}
				return newState
		  }
		: originalHook

	store.listeners && store.listeners.push(newListenerItem)
	return cleanupListeners(store, newListenerItem)
}
