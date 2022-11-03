export default class Stack {
	private top: number
	private items: Array<any>

	constructor() {
		this.top = 0
		this.items = []
	}

	public push(item: any): void {
		this.top++
		this.items.push(item)
	}

	public pop(): void {
		--this.top
		return this.items.pop()
	}

	public peek(): void {
		return this.items[this.top - 1]
	}
}
