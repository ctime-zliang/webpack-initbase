import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const componentContextmenuRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/contextmenu',
		exact: true,
		element: Index,
	}
}
