import React, { useContext } from 'react'
import { useAtom } from 'jotai'
import { AtomStoreContext, TMixinStore } from '../../store/Main'
import { ATTR_STORE_NAME, TAttrStore } from '../../store/Attr'
import { INFO_STORE_NAME, TInfoStore } from '../../store/Info'

export function ResultView(): React.ReactElement {
	console.log(`Component: ResultView`)
	const atomStore: TMixinStore = useContext(AtomStoreContext)
	const [valStore1, setStore1] = useAtom(atomStore[ATTR_STORE_NAME])
	const [valStore2, setStore2] = useAtom(atomStore[INFO_STORE_NAME])
	const attrStore: TAttrStore = valStore1 as TAttrStore
	const infoStore: TInfoStore = valStore2 as TInfoStore
	return (
		<div style={{ color: attrStore.warn ? 'red' : 'black' }}>
			Result: {attrStore.price * attrStore.count} (Title: {infoStore.title || '-'})
		</div>
	)
}
