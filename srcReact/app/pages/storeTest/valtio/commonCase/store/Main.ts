import { createContext } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { attrStoreTemplate, TAttrStore } from './Attr'
import { infoStoreTemplate, TInfoStore } from './Info'

export async function createStoreInstance(): Promise<TMainStore> {
	const store: TMainStore = proxy(mainStoreTemplate)
	return store
}

export type TMainStore = {
	attrStore: TAttrStore
	infoStore: TInfoStore
}

export const mainStoreTemplate: TMainStore = {
	attrStore: attrStoreTemplate,
	infoStore: infoStoreTemplate,
}

export const MainStoreContext = createContext<TMainStore>(null!)
