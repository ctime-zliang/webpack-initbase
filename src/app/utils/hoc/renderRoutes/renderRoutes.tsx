import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

export type TRouteItem = {
	path: string
	component: React.ReactElement | React.FC | any
	layout?: React.ReactElement | React.FC | any
	render?: (...r: any[]) => {}
	requiresAuth?: boolean
	routes?: TRouteItem[]
	exact?: boolean
	noMatch?: boolean
	strict?: boolean
	sensitive?: boolean
	meta?: any
	getInitialProps?: (...r: any[]) => {}
	asyncStoreKeys?: string[]
	[key: string]: any
}

const createSpecRoute = function (route: TRouteItem, profile: { [key: string]: any }, outerProps: { [key: string]: any }): React.ReactElement {
	let SpecComponent: any = null
	if (route.noMatch) {
		SpecComponent = route.noMatch
	}
	if (profile.noMatch) {
		SpecComponent = profile.noMatch
	}
	if (SpecComponent) {
		return (
			<Route
				path={route.path}
				element={(props: any): React.ReactElement => {
					return <SpecComponent path={route.path} {...props} {...outerProps}></SpecComponent>
				}}
			/>
		)
	}
	return null as unknown as React.ReactElement
}

const createRouteComponentList = function (
	routes: Array<TRouteItem>,
	profile: { [key: string]: any },
	outerProps: { [key: string]: any }
): Array<React.ReactElement> {
	return routes.map((route: TRouteItem): React.ReactElement => {
		return (
			<Route
				key={route.path}
				path={route.path}
				element={
					<>
						<Routes>
							{createRouteComponentList(route.routes || [], profile, outerProps)}
							<Route
								path={route.path}
								element={
									<route.layout {...outerProps} {...route}>
										<route.component {...outerProps} {...route}></route.component>
									</route.layout>
								}
							/>
							{createSpecRoute(route, profile, outerProps)}
						</Routes>
					</>
				}
			/>
		)
	})
}

export function renderRoutes(routes: TRouteItem[], profile: { [key: string]: any }, outerProps: { [key: string]: any }): React.ReactElement {
	return <Routes>{createRouteComponentList(routes, profile, outerProps)}</Routes>
}
