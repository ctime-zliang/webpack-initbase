import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const componentPaginationRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/pagination',
		exact: true,
		element: Index,
	}
}
