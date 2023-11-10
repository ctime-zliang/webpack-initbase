import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../../utils/hoc/renderRoutes/renderRoutes'
import Error404 from './404'

export const storeTestErrorRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404,
	}
}
