import React, { useContext } from 'react'
import { Input } from 'antd'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useWatch } from '../../../../../store/edaStore/useWatch'

export function PriceView(): React.ReactElement {
	console.log(`Component: PriceView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	useWatch(mainStore.attrStore)
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
