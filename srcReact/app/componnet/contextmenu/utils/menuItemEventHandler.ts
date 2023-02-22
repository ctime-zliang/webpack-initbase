import { TBoundingClientRectResultToJSONResult } from '../types/type'
import { isMouseLeaveContainer } from './isMouseLeaveContainer'

export function menuItemElementMouseOverEventHandler(currentElement: HTMLElement): void {
	if (!currentElement) {
		return
	}
	const currentFirstChildElement: HTMLElement = currentElement.firstElementChild as HTMLElement
	if (!currentFirstChildElement || currentFirstChildElement.classList.contains('ctxmenu-item-hover')) {
		return
	}
	const ctxmenuItems: Array<HTMLElement> = Array.from(
		(currentElement.parentElement as HTMLElement).querySelectorAll('.ctxmenu-item')
	) as Array<HTMLElement>
	ctxmenuItems.forEach((item: HTMLElement): void => {
		item.firstElementChild?.classList.remove('ctxmenu-item-hover')
		setSubMenuListHide(item)
	})
	currentElement.firstElementChild?.classList.add('ctxmenu-item-hover')
	setSubMenuListShow(currentElement)
}

function setSubMenuListShow(panelWrapperElement: HTMLElement): void {
	const currentRect: TBoundingClientRectResultToJSONResult = panelWrapperElement.getBoundingClientRect().toJSON()
	const ulElement: HTMLElement = panelWrapperElement.querySelector('ul') as HTMLElement
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

function setSubMenuListHide(panelWrapperElement: HTMLElement): void {
	const ulElement: HTMLElement = panelWrapperElement.querySelector('ul') as HTMLElement
	if (!ulElement) {
		return
	}
	if (isMouseLeaveContainer(ulElement)) {
		return
	}
	ulElement.classList.remove('ctxmenu-show-menu')
	ulElement.style.display = 'none'
}
