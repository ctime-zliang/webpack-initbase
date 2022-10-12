import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const testpageRoute = (): TRouteItem => {
	return {
		path: '/testpage',
		exact: true,
		element: Index,
	}
}
