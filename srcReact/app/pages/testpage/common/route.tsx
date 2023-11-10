import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const testpageCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/common',
		exact: true,
		element: Index,
	}
}
