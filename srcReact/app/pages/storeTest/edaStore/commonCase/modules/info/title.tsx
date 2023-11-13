import React, { useContext } from 'react'
import { Input } from 'antd'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useWatch } from '../../../../../../store/edaStore/useWatch'

export function TitleView(): React.ReactElement {
	console.log(`Component: TitleView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	useWatch(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.title = inputElement.value
	}
	return (
		<div>
			<Input addonBefore="Title" defaultValue={mainStore.infoStore.title} onChange={inputInputAction} />
		</div>
	)
}
