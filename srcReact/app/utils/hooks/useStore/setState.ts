export function setState(store: any, state: any, updatedCallback?: (a: any) => void): void {
	store.state = { ...store.state, ...state }
	store.flushListeners()
	if (updatedCallback instanceof Function) {
		updatedCallback(store)
	}
}
