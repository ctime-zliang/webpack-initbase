import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const homeRoute = (): TRouteItem => {
	return {
		path: '/',
		exact: true,
		component: Index,
	}
}
