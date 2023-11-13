import React, { useContext } from 'react'
import { Input } from 'antd'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useWatch } from '../../../../../../store/edaStore/useWatch'

export function NameView(): React.ReactElement {
	console.log(`Component: NameView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	useWatch(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.name = inputElement.value
	}
	return (
		<div>
			<Input addonBefore="Name" defaultValue={mainStore.infoStore.name} onChange={inputInputAction} />
		</div>
	)
}
