import React, { useContext } from 'react'
import { useSnapshot } from 'valtio'
import { TMainStore, MainStoreContext } from '../../store/Main'

export function DisplayView(): React.ReactElement {
	console.log(`Component: DisplayView`)
	const mainStore: TMainStore = useContext(MainStoreContext)
	useSnapshot(mainStore.infoStore)
	return (
		<div>
			Display: {mainStore.infoStore.title || '-'} | {mainStore.infoStore.name || '-'} | {mainStore.infoStore.age || '-'}
		</div>
	)
}
