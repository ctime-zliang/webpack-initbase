import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useWatch } from '../../../../../../store/edaStore/useWatch'
import { usePartialStore } from '../../../../../../store/edaStore/usePartialStore'

export function TitleView(): React.ReactElement {
	console.log(`Component: TitleView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	usePartialStore(mainStore.infoStore, ['title'])
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.title = inputElement.value
	}
	return (
		<div>
			<label>Title: </label>
			<input type="text" value={mainStore.infoStore.title} onChange={inputInputAction} />
		</div>
	)
}