import { RuntimeCache } from '../cache/cache'
import { TContextMenu } from '../types/type'

export function rootElementBlurEventHandler(e: FocusEvent): void {
	const targetElement: HTMLElement = e.currentTarget as HTMLElement
	try {
		unmountContextmenu(targetElement)
	} catch (e: any) {
		console.error(`contextmenu root element removed error.`, e)
	}
}

export function rootElementKeydownEventHandler(e: KeyboardEvent): void {
	const rootElement: HTMLElement = e.target as HTMLElement
	const itemData: TContextMenu = RuntimeCache.get(rootElement.id) as TContextMenu
	if (!itemData) {
		return
	}
	const unmount: () => void = (): void => {
		unmountContextmenu(rootElement)
	}
	itemData.onKeydown && itemData.onKeydown(e, unmount)
}

export function rootElementKeyupEventHandler(e: KeyboardEvent): void {
	const rootElement: HTMLElement = e.target as HTMLElement
	const itemData: TContextMenu = RuntimeCache.get(rootElement.id) as TContextMenu
	if (!itemData) {
		return
	}
	const unmount: () => void = (): void => {
		unmountContextmenu(rootElement)
	}
	itemData.onKeyup && itemData.onKeyup(e, unmount)
}

export function unmountContextmenu(rootElement: HTMLElement): void {
	const reactRoot = (rootElement as any).root
	rootElement.removeEventListener('blur', rootElementBlurEventHandler)
	rootElement.removeEventListener('keydown', rootElementKeydownEventHandler)
	rootElement.removeEventListener('keyup', rootElementKeyupEventHandler)
	reactRoot.unmount()
	rootElement.remove()
	RuntimeCache.delete(rootElement.id)
}
