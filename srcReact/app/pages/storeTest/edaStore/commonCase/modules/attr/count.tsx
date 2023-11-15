import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { usePartialStore } from '../../../../../../store/edaStore/usePartialStore'

export function CountView(): React.ReactElement {
	console.log(`Component: CountView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	usePartialStore(mainStore.attrStore, ['count'])
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.attrStore.count = +inputElement.value
		mainStore.attrStore.whenPayamountUpdate()
	}
	return (
		<div>
			<label>Count: </label>
			<input type="number" value={mainStore.attrStore.count} onChange={inputInputAction} />
		</div>
	)
}
