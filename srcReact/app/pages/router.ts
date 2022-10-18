import Layout from '../pages/layout'
import { TRouteItem } from '../utils/hoc/renderRoutes/renderRoutes'
import { TReduxStore } from '../store/public/types'
/* ... */
import { homeRoute } from '../pages/home/route'
import { error404Route } from '../pages/errorPage/route'
import { linkListRoute } from '../pages/linkList/route'
import { articleListRoute } from '../pages/article/list/route'
import { articleDetailRoute } from '../pages/article/detail/route'
import { articleErrorRoute } from '../pages/article/error/route'
import { reduxContainerRoute } from '../pages/redux/route'
import { valtioContainerRoute } from '../pages/valtio/route'
import { testpageRoute } from '../pages/testpage/route'
import { scrollingRoute } from '../pages/infiniteScrolling/route'

export const createRoutes = (reduxStore: TReduxStore): Array<TRouteItem> => {
	return [
		homeRoute(reduxStore),
		linkListRoute(reduxStore),
		{
			path: '/article/*',
			routes: [articleListRoute(reduxStore), articleDetailRoute(reduxStore), articleErrorRoute(reduxStore)],
		},
		reduxContainerRoute(reduxStore),
		valtioContainerRoute(reduxStore),
		testpageRoute(reduxStore),
		scrollingRoute(reduxStore),
		error404Route(reduxStore),
	]
}

export const filterRoutes = (routes: Array<TRouteItem> = []): Array<TRouteItem> => {
	return exec(routes, ``), routes

	function exec(routes: Array<TRouteItem> = [], prefixPath: string = ''): void {
		let path: string = ``
		for (let i: number = 0; i < routes.length; i++) {
			const routeItem: TRouteItem = routes[i]
			if (routeItem.routes && routeItem.routes.length) {
				exec(routeItem.routes)
			}
			path = prefixPath + routeItem.path
			routeItem.path = path
			routeItem.layout = Layout
		}
	}
}
