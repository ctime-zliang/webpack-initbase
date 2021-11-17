Object.defineProperty(Array.prototype, 'sum', {
	value: function () {
		return this.reduce((sum: number, num: number): number => (sum += num), 0)
	},
})

export function aaa(obj: any): any {
	return obj.aaa
}

export function bbb(obj: any): any {
	return obj
}

export function ccc(obj: any): string {
	return JSON.stringify(obj)
}

;(window as any).__globalIndex = Math.random()
