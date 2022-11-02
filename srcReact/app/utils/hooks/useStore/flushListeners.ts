export function flushListeners(store: any): void {
	for (let i: number = 0; i < store.listeners.length; i++) {
		store.listeners[i].run(store.state)
	}
}
