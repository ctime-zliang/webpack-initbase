import { createContext } from 'react'
import { atom } from 'jotai'
import { attrStore, ATTR_STORE_NAME, TAttrStore } from './Attr'
import { infoStore, INFO_STORE_NAME, TInfoStore } from './Info'

export type TAtomResult<T> = {
	init: TAttrStore | TInfoStore
} & any

export type TMixinStore = {
	[key: string]: TAtomResult<TAttrStore | TInfoStore>
}

export async function createStoreInstance(): Promise<TMixinStore> {
	const atomInstanceMap: TMixinStore = {}
	atomInstanceMap[INFO_STORE_NAME] = atom({ ...infoStore })
	atomInstanceMap[ATTR_STORE_NAME] = atom({ ...attrStore })
	return atomInstanceMap
}

export const AtomStoreContext = createContext<TMixinStore>(null!)
