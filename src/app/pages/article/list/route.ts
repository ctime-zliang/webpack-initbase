import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const articleListRoute = (): TRouteItem => {
	return {
		path: '/',
		exact: true,
		element: Index,
	}
}
