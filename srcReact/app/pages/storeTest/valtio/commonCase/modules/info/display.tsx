import React, { useContext } from 'react'
import { useSnapshot } from 'valtio'
import { MainStoreContext, MainStore } from '../../store/Main'

export function DisplayView(): React.ReactElement {
	console.log(`Component: DisplayView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const infoStore = useSnapshot(mainStore.infoStore)
	return (
		<div>
			Display: {infoStore.title || '-'} | {infoStore.name || '-'} | {infoStore.age || '-'}
		</div>
	)
}
