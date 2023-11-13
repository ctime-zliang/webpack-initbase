import React, { useContext } from 'react'
import { useSnapshot } from 'valtio'
import { TMainStore, MainStoreContext } from '../../store/Main'

export function ResultView(): React.ReactElement {
	console.log(`Component: ResultView`)
	const mainStore: TMainStore = useContext(MainStoreContext)
	useSnapshot(mainStore.attrStore)
	useSnapshot(mainStore.infoStore)
	return (
		<div>
			<div>
				Result: {mainStore.attrStore.price * mainStore.attrStore.count} (Title: {mainStore.infoStore.title || '-'})
			</div>
		</div>
	)
}
