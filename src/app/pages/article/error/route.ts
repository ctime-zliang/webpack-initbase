import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Error404 from './404'

export const articleErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404,
	}
}
