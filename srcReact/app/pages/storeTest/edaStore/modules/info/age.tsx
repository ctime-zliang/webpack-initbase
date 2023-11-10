import React, { useContext } from 'react'
import { Input } from 'antd'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useWatch } from '../../../../../store/edaStore/useWatch'

export function AgeView(): React.ReactElement {
	console.log(`Component: AgeView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	useWatch(mainStore.infoStore)
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
