import { associateActions } from './associateActions'
import { setState } from './setState'
import { hook } from './hook'
import { flushListeners } from './flushListeners'

export type TUseStore = {
	state: any
	actions?: { [key: string]: any }
	listeners?: Array<(a: any) => any>
	setState?: (state: any, updatedCallback?: (a: any) => void) => void
	flushListeners?: (store: any) => void
}

function useStore(initialState: any, actions: { [Key: string]: any }) {
	const store: TUseStore = {
		state: initialState,
		listeners: [],
		setState: undefined,
		flushListeners: undefined,
		actions: undefined,
	}
	store.setState = setState.bind(null, store)
	store.flushListeners = flushListeners.bind(null, store)
	store.actions = associateActions(store, actions)
	return hook.bind(null, store)
}

export default useStore
