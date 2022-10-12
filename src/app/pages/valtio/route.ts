import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const valtioContainerRoute = (): TRouteItem => {
	return {
		path: '/valtio',
		exact: true,
		element: Index,
	}
}
