import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const reduxContainerRoute = (): TRouteItem => {
	return {
		path: '/redux',
		exact: true,
		element: Index,
	}
}
