export function rootElementBlurEventHandler(e: FocusEvent): void {
	const targetElement: HTMLElement = e.currentTarget as HTMLElement
	try {
		unmountContextmenu(targetElement)
	} catch (e: any) {
		console.error(`contextmenu root element removed error.`, e)
	}
}

export function unmountContextmenu(rootElement: HTMLElement): void {
	const reactRoot = (rootElement as any).root
	reactRoot.unmount()
	rootElement.removeEventListener('blur', rootElementBlurEventHandler)
	rootElement.remove()
}
