import { TBoundingClientRectResultToJSONResult } from '../types/type'
import { isMouseLeaveContainer } from './isMouseLeaveContainer'

export function menuItemElementMouseenterEventHandler(currentElement: HTMLElement): void {
	if (!currentElement) {
		return
	}
	const currentRect: TBoundingClientRectResultToJSONResult = currentElement.getBoundingClientRect().toJSON()
	const ulElement: HTMLElement = currentElement.querySelector('ul') as HTMLElement
	if (!ulElement || ulElement.classList.contains('ctxmenu-show-menu')) {
		return
	}
	ulElement.classList.remove('ctxmenu-show-menu')
	ulElement.style.display = 'block'
	ulElement.style.visibility = `hidden`
	ulElement.style.opacity = `0`
	const ulRect: TBoundingClientRectResultToJSONResult = ulElement.getBoundingClientRect().toJSON()
	if (currentRect.right + ulRect.width >= document.documentElement.clientWidth) {
		ulElement.style.left = `${0 - ulRect.width}px`
	} else {
		ulElement.style.left = `${currentRect.width}px`
	}
	if (ulRect.bottom >= document.documentElement.clientHeight) {
		ulElement.style.top = `${0 - ulRect.height}px`
	} else {
		ulElement.style.top = `0px`
	}
	ulElement.classList.add('ctxmenu-show-menu')
	ulElement.style.visibility = null as unknown as string
	ulElement.style.opacity = null as unknown as string
}

export function menuItemElementMouseleaveEventHandler(currentElement: HTMLElement): void {
	if (!currentElement) {
		return
	}
	const ulElement: HTMLElement = currentElement.querySelector('ul') as HTMLElement
	if (!ulElement) {
		return
	}
	if (isMouseLeaveContainer(ulElement)) {
		return
	}
	ulElement.classList.remove('ctxmenu-show-menu')
	ulElement.style.display = 'none'
}
