import { TReduxStore } from '../../store/public/types'
import { TRouteItem } from '../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const testpageRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/testpage',
		exact: true,
		element: Index,
	}
}
