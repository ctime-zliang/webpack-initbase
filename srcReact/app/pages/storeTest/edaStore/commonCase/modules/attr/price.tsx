import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { usePartialStore } from '../../../../../../store/edaStore/usePartialStore'

export function PriceView(): React.ReactElement {
	console.log(`Component: PriceView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	usePartialStore(mainStore.attrStore, ['price'])
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.attrStore.price = +inputElement.value
		mainStore.attrStore.whenPayamountUpdate()
	}
	return (
		<div>
			<label>Price: </label>
			<input type="number" value={mainStore.attrStore.price} onChange={inputInputAction} />
		</div>
	)
}
