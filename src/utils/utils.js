Object.defineProperty(Array.prototype, 'sum', {
	value: function () {
		return this.reduce((sum, num) => (sum += num), 0)
	},
})

export function aaa(obj) {
	return obj.aaa
}

export function bbb(obj) {
	return obj
}

export function ccc(obj) {
	return JSON.stringify(obj)
}

window.__globalIndex = Math.random()
