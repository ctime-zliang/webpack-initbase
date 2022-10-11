import React from 'react'
import { renderRoutes, TRouteItem } from '@/app/utils/hoc/renderRoutes/renderRoutes'
import { createRoutes, filterRoutes, noMatchComponent } from './router'

function Root(props: any): React.ReactElement {
	console.log(`Root ☆☆☆`, props)
	const authPath: string = '/'
	const routes: Array<TRouteItem> = filterRoutes(createRoutes())
	return (
		<>
			{renderRoutes(
				routes,
				{
					authPath,
					noMatch: noMatchComponent,
				},
				{ ...props }
			)}
		</>
	)
}

export default Root
