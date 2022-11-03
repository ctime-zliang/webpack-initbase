import { associateActions } from './associateActions'
import { setState } from './setState'
import { hook, THookReturnFunction, THookReturnFunctionResult } from './hook'
import { flushListeners } from './flushListeners'
import { TListenerEffectItem } from './newListenerEffect'

export type TUseStore = {
	state: any
	actions?: { [key: string]: any }
	listeners?: Array<TListenerEffectItem>
	setState?: (state: any, updatedCallback?: (a: any) => void) => void
	flushListeners?: (store: TUseStore) => void
}

function useStore(initialState: any, actions: { [Key: string]: any }): THookReturnFunction {
	const store: TUseStore = {
		state: initialState,
		listeners: [],
		setState: undefined,
		flushListeners: undefined,
		actions: undefined,
	}
	// store.setState = setState.bind(undefined, store)
	store.setState = (state: any, updatedCallback?: (a: TUseStore) => void): void => {
		return setState(store, state, updatedCallback)
	}
	// store.flushListeners = flushListeners.bind(undefined, store)
	store.flushListeners = (): void => {
		return flushListeners(store)
	}
	store.actions = associateActions(store, actions)
	return (mapState?: any, mapActions?: any): THookReturnFunctionResult => {
		return hook(store, mapState, mapActions)
	}
}

export default useStore
