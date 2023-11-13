import React, { useContext } from 'react'
import { MainStoreContext, MainStore } from '../../store/Main'
import { useSnapshot } from 'valtio'

export function TitleView(): React.ReactElement {
	console.log(`Component: TitleView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.title = inputElement.value
	}
	const infoStore = useSnapshot(mainStore.infoStore)
	return (
		<div>
			<label>Title: </label>
			<input type="text" value={infoStore.title} onChange={inputInputAction} />
		</div>
	)
}
