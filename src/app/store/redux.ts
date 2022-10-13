import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { TReduxStore } from './public/types'
import { createReducer as globalDefault_createReducer, initialState as globalDefault_initialState } from './globalDefault/reducer'
import { TStore as globalDefault_TStore } from './globalDefault/types'
import { moduleKey as globalDefault_moduleKey } from './globalDefault/config'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

function createCombineReducers(asyncReducers: { [key: string]: any } = {}) {
	const o: { [key: string]: any } = {
		[globalDefault_moduleKey]: globalDefault_createReducer(),
		...asyncReducers,
	}
	return {
		combinedReducer: combineReducers(o),
		syncReducerKeys: Object.keys(o),
	}
}

export function modulesInjectReducer(store: TReduxStore, key: string, createAsyncReducer: Function): TReduxStore {
	const concernedStoreKeys: Array<string> = Object.keys(store.asyncReducers || {})
	if (concernedStoreKeys.includes(key)) {
		return store
	}
	store.asyncReducers[key] = createAsyncReducer()
	const ccr = createCombineReducers(store.asyncReducers)
	store.replaceReducer(ccr.combinedReducer)
	return store
}

export const configureStore = (): TReduxStore => {
	const ccr = createCombineReducers()
	const store = createStoreWithMiddleware(ccr.combinedReducer, {
		[globalDefault_moduleKey as string]: globalDefault_initialState,
	}) as TReduxStore
	store.asyncReducers = {}
	return store
}

export type TCombineState = {
	[globalDefault_moduleKey]: globalDefault_TStore
	[key: string]: any
}
