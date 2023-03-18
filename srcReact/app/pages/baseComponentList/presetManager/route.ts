import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const componentPresetManagerRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/presetManager',
		exact: true,
		element: Index,
	}
}
