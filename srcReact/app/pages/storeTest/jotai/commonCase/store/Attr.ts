export type TAttrStore = {
	price: number
	count: number
	warn: boolean
	whenPayamountUpdate: () => void
}

export const ATTR_STORE_NAME: string = 'ATTR_STORE_NAME'

export const attrStore: TAttrStore = {
	price: 100,
	count: 0,
	warn: false,
	whenPayamountUpdate(): void {
		this.warn = this.count * this.price >= 1000
	},
}

export function whenStoreCountUpdate(attrStore: TAttrStore, newValue: number): TAttrStore {
	const newState: TAttrStore = { ...attrStore }
	newState.count = newValue
	return whenPayamountUpdate(newState)
}

function whenPayamountUpdate(attrStore: TAttrStore): TAttrStore {
	const newState: TAttrStore = { ...attrStore }
	newState.warn = newState.count * newState.price >= 1000
	return newState
}
