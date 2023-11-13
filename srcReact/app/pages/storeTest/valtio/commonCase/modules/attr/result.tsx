import React, { useContext } from 'react'
import { useSnapshot } from 'valtio'
import { MainStoreContext, MainStore } from '../../store/Main'

export function ResultView(): React.ReactElement {
	console.log(`Component: ResultView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const { attrStore, infoStore } = useSnapshot(mainStore)
	return (
		<div style={{ color: attrStore.warn ? 'red' : 'black' }}>
			Result: {attrStore.price * attrStore.count} (Title: {infoStore.title || '-'})
		</div>
	)
}
