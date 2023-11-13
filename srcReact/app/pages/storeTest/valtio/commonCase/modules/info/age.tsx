import React, { useContext } from 'react'
import { Input } from 'antd'
import { TMainStore, MainStoreContext } from '../../store/Main'
import { useSnapshot } from 'valtio'

export function AgeView(): React.ReactElement {
	console.log(`Component: AgeView`)
	const mainStore: TMainStore = useContext(MainStoreContext)
	useSnapshot(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.age = +inputElement.value
	}
	return (
		<div>
			<Input type="number" addonBefore="Age" defaultValue={mainStore.infoStore.age} onChange={inputInputAction} />
		</div>
	)
}
