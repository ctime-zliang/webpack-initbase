import { MainStore } from './Main'

export class AttrStore {
	private parent: MainStore
	private _price: number
	private _count: number
	constructor(parent: MainStore) {
		this.parent = parent
		this._price = 100
		this._count = 0
	}

	public get price(): number {
		return this._price
	}
	public set price(value: number) {
		this._price = value
	}

	public get count(): number {
		return this._count
	}
	public set count(value: number) {
		this._count = value
	}
}
