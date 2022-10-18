import { TReduxStore } from '../../store/public/types'
import { TRouteItem } from '../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const scrollingRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/srcolling',
		exact: true,
		element: Index,
	}
}
