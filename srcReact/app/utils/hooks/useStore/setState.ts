import { TUseStore } from '.'

export function setState(store: TUseStore, state: any, updatedCallback?: (a: TUseStore) => void): void {
	store.state = { ...store.state, ...state }
	{
		;(store.flushListeners as Function)()
	}
	if (updatedCallback instanceof Function) {
		updatedCallback(store)
	}
}
