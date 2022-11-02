export function cleanupListeners(store: any, listener: any): void {
	store.listeners = store.listeners.filter((item: any) => {
		return item !== listener
	})
}
