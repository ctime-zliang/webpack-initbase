import Layout from '../pages/layout'
import { TRouteItem } from '../utils/hoc/renderRoutes/renderRoutes'
import { TReduxStore } from '../store/public/types'
/* ... */
import { homeRoute } from './home/route'
import { error404Route } from './errorPage/route'
import { linkListRoute } from './linkList/route'
import { articleListRoute } from './article/list/route'
import { articleDetailRoute } from './article/detail/route'
import { articleErrorRoute } from './article/error/route'
import { reduxContainerRoute } from './redux/route'
import { valtioContainerRoute } from './valtio/route'
import { testpageRoute } from './testpage/route'
import { scrollingRoute } from './infiniteScrolling/route'
import { componentPaginationRoute } from './baseComponentList/pagination/route'
import { componentTreeRoute } from './baseComponentList/tree/route'

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
		{
			path: '/componentLib/*',
			routes: [componentPaginationRoute(reduxStore), componentTreeRoute(reduxStore)],
		},
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
