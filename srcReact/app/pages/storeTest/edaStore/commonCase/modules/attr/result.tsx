import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useWatch } from '../../../../../../store/edaStore/useWatch'

export function ResultView(): React.ReactElement {
	console.log(`Component: ResultView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	useWatch(mainStore.infoStore)
	useWatch(mainStore.attrStore)
	return (
		<div style={{ color: mainStore.attrStore.warn ? 'red' : 'black' }}>
			Result: {mainStore.attrStore.price * mainStore.attrStore.count} (Title: {mainStore.infoStore.title || '-'})
		</div>
	)
}
