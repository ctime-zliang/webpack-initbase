export function setState(store: any, state: any, updatedCallback: (a: any) => void = Function): void {
	store.state = { ...store.state, ...state }
	store.flushListeners()
	updatedCallback && updatedCallback(store)
}
