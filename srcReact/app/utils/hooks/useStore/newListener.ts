import { cleanupListeners } from './cleanupListeners'

export function newListener(store: any, oldState: any, mapState: any, originalHook: any): void {
	const newListenerItem = {
		oldState,
		run: undefined,
	}
	newListenerItem.run = mapState
		? (newState: any): void => {
				const state: any = mapState(newState)
				if (state !== newListenerItem.oldState) {
					newListenerItem.oldState = state
					originalHook(newState)
				}
		  }
		: originalHook

	store.listeners.push(newListenerItem)
	return cleanupListeners(store, newListenerItem)
}
