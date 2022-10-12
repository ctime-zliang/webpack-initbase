import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const articleDetailRoute = (): TRouteItem => {
	return {
		path: '/detail',
		exact: true,
		element: Index,
	}
}
