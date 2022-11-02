import React from 'react'
import { newListener } from './newListener'

export function hook(store: any, mapState: any, mapActions: any): [any, Array<(a: any) => any>] {
	const state: any = mapState ? mapState(store.state) : store.state
	const actions: Array<(a: any) => any> = mapActions ? mapActions(state.actions) : store.actions
	const [, originalHook] = React.useState(state)
	React.useEffect(() => {
		newListener(store, state, mapState, originalHook)
	}, [])
	return [state, actions]
}
