Object.defineProperty(Array.prototype, 'sum', {
	value: function () {
		return this.reduce((sum: number, num: number): number => (sum += num), 0)
	},
})

export async function sleep(delay: number = 500): Promise<null> {
	return new Promise((_, reject) => {
		window.setTimeout(() => {
			_(null)
		}, delay)
	})
}

;(window as any).__globalIndex = Math.random()
