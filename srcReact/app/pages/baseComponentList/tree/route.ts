import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const componentTreeRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/tree',
		exact: true,
		element: Index,
	}
}
