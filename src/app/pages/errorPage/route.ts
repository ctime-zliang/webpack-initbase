import { TReduxStore } from '@/app/store/public/types'
import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Error404 from './404'

export const error404Route = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404,
	}
}
