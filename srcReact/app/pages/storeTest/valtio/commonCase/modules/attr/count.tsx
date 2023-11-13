import React, { useContext } from 'react'
import { Input } from 'antd'
import { TMainStore, MainStoreContext } from '../../store/Main'
import { useSnapshot } from 'valtio'

export function CountView(): React.ReactElement {
	console.log(`Component: CountView`)
	const mainStore: TMainStore = useContext(MainStoreContext)
	useSnapshot(mainStore.attrStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.attrStore.count = +inputElement.value
	}
	return (
		<div>
			<Input type="number" addonBefore="Count" defaultValue={mainStore.attrStore.count} onChange={inputInputAction} />
		</div>
	)
}
