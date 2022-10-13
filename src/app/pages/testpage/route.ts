import { TReduxStore } from '@/app/store/public/types'
import { TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const testpageRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/testpage',
		exact: true,
		element: Index,
	}
}
