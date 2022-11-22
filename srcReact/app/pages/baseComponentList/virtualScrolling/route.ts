import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const componentvirtualScrollingRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/virtualscrolling',
		exact: true,
		element: Index,
	}
}
