import { TReduxStore } from '../../../../store/public/types'
import { TRouteItem } from '../../../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const storeTestEdaAbstractStoreCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/eda',
		exact: true,
		element: Index,
	}
}
