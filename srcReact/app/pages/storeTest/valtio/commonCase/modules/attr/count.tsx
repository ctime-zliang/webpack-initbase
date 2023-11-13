import React, { useContext } from 'react'
import { MainStoreContext, MainStore } from '../../store/Main'
import { useSnapshot } from 'valtio'

export function CountView(): React.ReactElement {
	console.log(`Component: CountView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.attrStore.count = +inputElement.value
		mainStore.attrStore.whenPayamountUpdate()
	}
	const attrStore = useSnapshot(mainStore.attrStore)
	const count: number = attrStore.count
	return (
		<div>
			<label>Count: </label>
			<input type="number" value={count} data-value={count} onChange={inputInputAction} />
		</div>
	)
}
