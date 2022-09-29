import { createStore, combineReducers, Store, Reducer } from 'redux'
import { createReducer as counter_createReducer, initialState as counter_initialState } from './counter/reducer'
import { TStore as counter_TStore } from './counter/types'
import { moduleKey as counter_moduleKey } from './counter/config'
import { createReducer as timeStamp_createReducer, initialState as timeStamp_initialState } from './timeStamp/reducer'
import { TStore as timeStamp_TStore } from './timeStamp/types'
import { moduleKey as timeStamp_moduleKey } from './timeStamp/config'

export const configureStore = (): Store => {
	const reducer = combineReducers({
		[counter_moduleKey]: counter_createReducer(),
		[timeStamp_moduleKey]: timeStamp_createReducer(),
	})
	const store: Store = createStore(reducer, {
		[counter_moduleKey]: counter_initialState,
		[timeStamp_moduleKey]: timeStamp_initialState,
	})
	return store
}

export type TCombineState = {
	[counter_moduleKey]: counter_TStore
	[timeStamp_moduleKey]: timeStamp_TStore
}

export const store: Store = configureStore()
