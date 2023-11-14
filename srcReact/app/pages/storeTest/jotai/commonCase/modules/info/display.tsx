import React, { useContext } from 'react'
import { useAtom } from 'jotai'
import { AtomStoreContext, TMixinStore } from '../../store/Main'
import { INFO_STORE_NAME, TInfoStore } from '../../store/Info'

export function DisplayView(): React.ReactElement {
	console.log(`Component: DisplayView`)
	const atomStore: TMixinStore = useContext(AtomStoreContext)
	const [valStore, setStore] = useAtom(atomStore[INFO_STORE_NAME])
	const infoStore: TInfoStore = valStore as TInfoStore
	return (
		<div>
			Display: {infoStore.title || '-'} | {infoStore.name || '-'} | {infoStore.age || '-'}
		</div>
	)
}
