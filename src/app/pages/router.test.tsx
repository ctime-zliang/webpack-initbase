import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { homeRoute } from '@/app/pages/home/route'
import { error404Route } from '@/app/pages/errorPage/route'
import { linkListRoute } from '@/app/pages/linkList/route'
import { articleListRoute } from '@/app/pages/article/list/route'
import { articleDetailRoute } from '@/app/pages/article/detail/route'
import { TCommonComponentBaseProps } from '../types/comm.types'

const homeRouteItem = homeRoute()
const error404RouteItem = error404Route()
const linkListRouteItem = linkListRoute()
const articleListRouteItem = articleListRoute()
const articleDetailRouteItem = articleDetailRoute()

export function routerTest(params: TCommonComponentBaseProps): React.ReactElement {
	return (
		<Routes>
			<Route path="/" element={<homeRouteItem.element {...params} />} />
			<Route path="/link" element={<linkListRouteItem.element {...params} />} />
			<Route
				path="/article/*"
				element={
					<>
						<Routes>
							<Route path="/" element={<articleListRouteItem.element {...params} />} />
							<Route path="/detail" element={<articleDetailRouteItem.element {...params} />} />
							<Route path="*" element={<error404RouteItem.element {...params} />} />
						</Routes>
					</>
				}
			></Route>
			<Route path="*" element={<error404RouteItem.element {...params} />} />
		</Routes>
	)
}

export default routerTest
