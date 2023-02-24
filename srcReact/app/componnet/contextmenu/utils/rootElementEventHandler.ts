import { RuntimeCache } from '../cache/cache'

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
	rootElement.removeEventListener('blur', rootElementBlurEventHandler)
	reactRoot.unmount()
	rootElement.remove()
	RuntimeCache.delete(rootElement.id)
	console.log(RuntimeCache)
}
