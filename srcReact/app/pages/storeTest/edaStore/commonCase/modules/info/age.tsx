import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { usePartialStore } from '../../../../../../store/edaStore/usePartialStore'

export function AgeView(): React.ReactElement {
	console.log(`Component: AgeView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	usePartialStore(mainStore.infoStore, ['age'])
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.age = +inputElement.value
	}
	return (
		<div>
			<label>Age: </label>
			<input type="number" value={mainStore.infoStore.age} onChange={inputInputAction} />
		</div>
	)
}
