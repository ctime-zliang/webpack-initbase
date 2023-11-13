import { createContext } from 'react'
import { EdaAbstractStore } from '../../../../../store/edaStore/EdaAbstractStore'
import { AttrStore } from './Attr'
import { InfoStore } from './Info'

export async function createStoreInstance(): Promise<MainStore> {
	const store: MainStore = new MainStore()
	await store.initial()
	return store
}

export class MainStore extends EdaAbstractStore {
	public infoStore: InfoStore
	public attrStore: AttrStore
	constructor() {
		super()
		this.infoStore = new InfoStore(this)
		this.attrStore = new AttrStore(this)
	}

	public async initial(): Promise<void> {
		/* ... */
	}

	public whenMouned(): void {
		console.log(`The module has mounted.`)
	}

	public whenUnmount(): void {
		console.log(`The module has unmounted.`)
	}
}

export const MainStoreContext = createContext<MainStore>(null!)
