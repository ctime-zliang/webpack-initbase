import React, { useContext } from 'react'
import { Input } from 'antd'
import { TMainStore, MainStoreContext } from '../../store/Main'
import { useSnapshot } from 'valtio'

export function PriceView(): React.ReactElement {
	console.log(`Component: PriceView`)
	const mainStore: TMainStore = useContext(MainStoreContext)
	useSnapshot(mainStore.attrStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.attrStore.price = +inputElement.value
	}
	return (
		<div>
			<Input type="number" addonBefore="Price" defaultValue={mainStore.attrStore.price} onChange={inputInputAction} />
		</div>
	)
}
