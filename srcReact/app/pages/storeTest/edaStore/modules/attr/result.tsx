import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useWatch } from '../../../../../store/edaStore/useWatch'

export function ResultView(): React.ReactElement {
	console.log(`Component: ResultView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	useWatch(mainStore.attrStore)
	return <div>总计: {mainStore.attrStore.price * mainStore.attrStore.count}</div>
}
