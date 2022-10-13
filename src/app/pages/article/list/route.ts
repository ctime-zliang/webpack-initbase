import { TReduxStore } from '@/app/store/public/types'
import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const articleListRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/',
		exact: true,
		element: Index,
	}
}
