import { TReduxStore } from '../../../../store/public/types'
import { TRouteItem } from '../../../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const storeTestProxyStoreCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/proxyStore',
		exact: true,
		element: Index,
	}
}
