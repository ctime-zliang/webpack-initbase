import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useWatch } from '../../../../../../store/edaStore/useWatch'

export function DisplayView(): React.ReactElement {
	console.log(`Component: DisplayView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	useWatch(mainStore.infoStore)
	return (
		<div>
			Display: {mainStore.infoStore.title || '-'} | {mainStore.infoStore.name || '-'} | {mainStore.infoStore.age || '-'}
		</div>
	)
}
