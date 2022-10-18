import Layout from '@/app/pages/layout'
import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import { TReduxStore } from '../store/public/types'
/* ... */
import { homeRoute } from '@/app/pages/home/route'
import { error404Route } from '@/app/pages/errorPage/route'
import { linkListRoute } from '@/app/pages/linkList/route'
import { articleListRoute } from '@/app/pages/article/list/route'
import { articleDetailRoute } from '@/app/pages/article/detail/route'
import { articleErrorRoute } from '@/app/pages/article/error/route'
import { reduxContainerRoute } from '@/app/pages/redux/route'
import { valtioContainerRoute } from '@/app/pages/valtio/route'
import { testpageRoute } from '@/app/pages/testpage/route'
import { scrollingRoute } from '@/app/pages/infiniteScrolling/route'

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
