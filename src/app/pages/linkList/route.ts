import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const linkListRoute = (): TRouteItem => {
	return {
		path: '/link',
		exact: true,
		component: Index,
	}
}
