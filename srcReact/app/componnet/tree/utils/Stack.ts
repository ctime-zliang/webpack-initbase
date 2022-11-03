export default class Stack {
	private _top: number
	private _items: Array<any>

	constructor() {
		this._top = 0
		this._items = []
	}

	public get top(): number {
		return this._top
	}

	public push(item: any): void {
		this._top++
		this._items.push(item)
	}

	public pop(): any {
		--this._top
		return this._items.pop()
	}

	public peek(): void {
		return this._items[this._top - 1]
	}
}
