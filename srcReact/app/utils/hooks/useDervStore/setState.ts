import { TUseStore } from '.'
import { FreeObject } from '../../utils'

export function setState(store: TUseStore, state: FreeObject<any>, updatedCallback?: (a: TUseStore) => void): void {
	store.state = { ...store.state, ...state }
	;(store.flushListeners as Function)()
	if (updatedCallback instanceof Function) {
		updatedCallback(store)
	}
}
