import { TReduxStore } from '@/app/store/public/types'
import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const linkListRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/link',
		exact: true,
		element: Index,
	}
}
