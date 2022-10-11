import Layout from '@/app/pages/layout'
import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
/* ... */
import { homeRoute } from '@/app/pages/home/route'
import { error404Route } from '@/app/pages/errorPage/route'
import { linkListRoute } from '@/app/pages/linkList/route'

export const createRoutes = (): Array<TRouteItem> => {
	return [homeRoute(), linkListRoute(), error404Route()]
}

export const filterRoutes = (routes: Array<TRouteItem> = []): Array<TRouteItem> => {
	return exec(routes, ``), routes

	function exec(routes: Array<TRouteItem> = [], prefixPath: string = ''): void {
		let path: string = ``
		for (let i: number = 0; i < routes.length; i++) {
			const routeItem: TRouteItem = routes[i]
			if (routeItem.routes && routeItem.routes.length) {
				exec(routeItem.routes, routeItem.path)
			}
			path = prefixPath + routeItem.path
			routeItem.path = path
			routeItem.layout = Layout
		}
	}
}

export const noMatchComponent = error404Route()
