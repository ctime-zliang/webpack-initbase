import { associateActions } from './associateActions'
import { setState } from './setState'
import { hook, TUseStoreReturnFunction, TUseStoreReturnFunctionResult, TListenerEffectItem } from './hook'
import { flushListeners } from './flushListeners'
import { FreeObject } from '../../utils'

export interface Store<S, A> {
	state: S
	actions: A
	setState(state: S, updatedCallback?: (a: Store<any, any>) => void): void
	listeners?: Array<TListenerEffectItem>
	flushListeners?: (store: TUseStore) => void
}

export type TUseStoreResult<S, A> = (() => [S, A]) &
	(<NS>(stateFunc: (state: S) => NS) => [NS, A]) &
	(<NS, NA>(stateFunc: (state: S) => NS, actionsFunc: (state: A) => NA) => [NS, NA]) &
	(<NA>(stateFunc: undefined, actionsFunc: (state: A) => NA) => [S, NA])

export type TUseStore = {
	state: any
	actions: { [key: string]: any }
	setState?: (state: any, updatedCallback?: (a: TUseStore) => void) => void
	listeners?: Array<TListenerEffectItem>
	flushListeners?: (store: TUseStore) => void
}

export function useDervStore<S, A>(inititalState: S, actions: object): TUseStoreResult<S, A>
export function useDervStore(initialState: FreeObject<any>, actions: FreeObject<any>): TUseStoreReturnFunction {
	const store: TUseStore = {
		state: initialState,
		actions: {},
		listeners: [],
		setState: undefined,
		flushListeners: undefined,
	}
	store.setState = (state: FreeObject<any>, updatedCallback?: (a: TUseStore) => void): void => {
		return setState(store, state, updatedCallback)
	}
	store.flushListeners = (): void => {
		return flushListeners(store)
	}
	store.actions = associateActions(store, actions)
	return (): TUseStoreReturnFunctionResult => {
		return hook(store)
	}
}

export default useDervStore
