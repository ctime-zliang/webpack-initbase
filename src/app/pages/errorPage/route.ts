import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Error404 from './404'

export const error404Route = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		component: Error404,
	}
}
