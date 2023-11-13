import React, { useContext } from 'react'
import { MainStoreContext, MainStore } from '../../store/Main'
import { useSnapshot } from 'valtio'

export function NameView(): React.ReactElement {
	console.log(`Component: NameView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.name = inputElement.value
	}
	const infoStore = useSnapshot(mainStore.infoStore)
	return (
		<div>
			<label>Name: </label>
			<input type="text" value={infoStore.name} onChange={inputInputAction} />
		</div>
	)
}
