import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useWatch } from '../../../../../../store/edaStore/useWatch'
import { usePartialStore } from '../../../../../../store/edaStore/usePartialStore'

export function NameView(): React.ReactElement {
	console.log(`Component: NameView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	usePartialStore(mainStore.infoStore, ['name'])
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.name = inputElement.value
	}
	return (
		<div>
			<label>Name: </label>
			<input type="text" value={mainStore.infoStore.name} onChange={inputInputAction} />
		</div>
	)
}
