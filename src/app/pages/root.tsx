import React from 'react'
import { renderRoutes, TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import { createRoutes, filterRoutes, noMatchComponent } from './router'
import { TCommonComponentBaseProps } from '../types/comm.types'

function Root(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Root ☆☆☆`, props)
	const { reduxStore } = props
	const authPath: string = '/'
	const routes: Array<TRouteItem> = filterRoutes(createRoutes())
	return renderRoutes(
		routes,
		{
			authPath,
			noMatch: noMatchComponent,
		},
		{ ...props }
	)
}

export default React.memo(Root)
