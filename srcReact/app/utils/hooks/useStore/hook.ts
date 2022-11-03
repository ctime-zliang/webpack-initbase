import React from 'react'
import { TUseStore } from '.'
import { newListenerEffect } from './newListenerEffect'

export type THookReturnFunction = (mapState?: any, mapActions?: any) => THookReturnFunctionResult
export type THookReturnFunctionResult = [any, { [key: string]: any }]

export function hook(store: TUseStore, mapState?: any, mapActions?: any): THookReturnFunctionResult {
	const state: any = mapState ? mapState(store.state) : store.state
	const actions: { [key: string]: any } = mapActions ? mapActions(state.actions) : store.actions
	const [, originalHook] = React.useState(state)
	React.useEffect((): void => {
		newListenerEffect(store, state, mapState, originalHook)
	}, [])
	return [state, actions]
}
