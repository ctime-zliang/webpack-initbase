import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
/* ... */
import { createReducer as counter_createReducer, initialState as counter_initialState } from './redux/counter/reducer'
import { TStore as counter_TStore } from './redux/counter/types'
import { moduleKey as counter_moduleKey } from './redux/counter/config'
/* ... */
import { createReducer as timeStamp_createReducer, initialState as timeStamp_initialState } from './redux/timeStamp/reducer'
import { TStore as timeStamp_TStore } from './redux/timeStamp/types'
import { moduleKey as timeStamp_moduleKey } from './redux/timeStamp/config'
/* ... */
import { createReducer as globalDefault_createReducer, initialState as globalDefault_initialState } from './globalDefault/reducer'
import { TStore as globalDefault_TStore } from './globalDefault/types'
import { moduleKey as globalDefault_moduleKey } from './globalDefault/config'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

export const configureStore = () => {
	const reducer = combineReducers({
		[globalDefault_moduleKey]: globalDefault_createReducer(),
		[counter_moduleKey]: counter_createReducer(),
		[timeStamp_moduleKey]: timeStamp_createReducer(),
	})
	const store = createStoreWithMiddleware(reducer, {
		[globalDefault_moduleKey]: globalDefault_initialState,
		[counter_moduleKey]: counter_initialState,
		[timeStamp_moduleKey]: timeStamp_initialState,
	})
	return store
}

export type TCombineState = {
	[globalDefault_moduleKey]: globalDefault_TStore
	[counter_moduleKey]: counter_TStore
	[timeStamp_moduleKey]: timeStamp_TStore
}
