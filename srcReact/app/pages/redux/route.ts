import { TReduxStore } from '../../store/public/types'
import { modulesInjectReducer } from '../../store/redux'
import { TRouteItem } from '../../utils/hoc/renderRoutes/renderRoutes'
/* ... */
import { createReducer as counter_createReducer } from '../../store/redux-counter/reducer'
import { moduleKey as counter_moduleKey } from '../../store/redux-counter/config'
/* ... */
import { createReducer as timeStamp_createReducer } from '../../store/redux-timeStamp/reducer'
import { moduleKey as timeStamp_moduleKey } from '../../store/redux-timeStamp/config'

import Index from '.'

export const reduxContainerRoute = (reduxStore: TReduxStore): TRouteItem => {
	modulesInjectReducer(reduxStore, counter_moduleKey, counter_createReducer)
	modulesInjectReducer(reduxStore, timeStamp_moduleKey, timeStamp_createReducer)
	return {
		path: '/redux',
		exact: true,
		element: Index,
	}
}
