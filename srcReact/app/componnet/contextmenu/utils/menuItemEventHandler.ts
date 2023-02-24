import { RuntimeCache } from '../cache/cache'
import { PADDING_VIEWPORT_BOTTOM, PADDING_VIEWPORT_TOP } from '../config/config'
import { EContextPanelAlignment } from '../config/enum'
import { TBoundingClientRectResultToJSONResult, TCacheValue } from '../types/type'
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
	const surveyLeft: number = -1
	const surveyTop: number = -1
	const cacheItem: TCacheValue = RuntimeCache.get(panelWrapperElement.getAttribute('data-domid') as string) as TCacheValue
	const mainElement: HTMLElement = panelWrapperElement.querySelector('main') as HTMLElement
	if (!mainElement || mainElement.classList.contains('ctxmenu-show-menu')) {
		return
	}
	mainElement.classList.remove('ctxmenu-show-menu')
	mainElement.style.display = 'block'
	mainElement.style.visibility = `hidden`
	mainElement.style.opacity = `0`
	mainElement.style.left = `${surveyLeft}px`
	mainElement.style.top = `${surveyTop}px`
	const currentRect: TBoundingClientRectResultToJSONResult = panelWrapperElement.getBoundingClientRect().toJSON()
	const mainRect: TBoundingClientRectResultToJSONResult = mainElement.getBoundingClientRect().toJSON()
	const anchorPointOffsetLeft: number = mainRect.left - surveyLeft
	const anchorPointOffsetTop: number = mainRect.top - surveyTop
	const viewClientHeight: number = document.documentElement.clientHeight
	const viewClientWidth: number = document.documentElement.clientWidth
	mainRect.x = -1
	mainRect.y = -1
	/* ... */
	/**
	 * 修正垂直定位
	 **/
	if (mainRect.height >= viewClientHeight - PADDING_VIEWPORT_TOP - PADDING_VIEWPORT_BOTTOM) {
		mainRect.top = PADDING_VIEWPORT_TOP - anchorPointOffsetTop
		mainRect.height = viewClientHeight - PADDING_VIEWPORT_TOP - PADDING_VIEWPORT_BOTTOM
		mainRect.bottom = mainRect.top + mainRect.height
	} else {
		if (cacheItem && cacheItem.panelAlignment === EContextPanelAlignment.RIGHT_TOP) {
			if (currentRect.top <= PADDING_VIEWPORT_TOP) {
				mainRect.top = PADDING_VIEWPORT_TOP
				mainRect.bottom = mainRect.top + mainRect.height
			}
			if (currentRect.bottom - mainRect.height <= PADDING_VIEWPORT_TOP) {
				mainRect.top = anchorPointOffsetTop - PADDING_VIEWPORT_TOP
				mainRect.bottom = mainRect.top + mainRect.height
			} else {
				mainRect.top = currentRect.bottom - mainRect.height - anchorPointOffsetTop + PADDING_VIEWPORT_TOP
				mainRect.bottom = mainRect.top + mainRect.height
			}
		} else {
			if (currentRect.top <= PADDING_VIEWPORT_TOP) {
				mainRect.top = PADDING_VIEWPORT_TOP
				mainRect.bottom = mainRect.top + mainRect.height
			}
			if (currentRect.top + mainRect.height >= viewClientHeight) {
				mainRect.top = viewClientHeight - mainRect.height - anchorPointOffsetTop - PADDING_VIEWPORT_BOTTOM
				mainRect.bottom = mainRect.top + mainRect.height
			} else {
				mainRect.top = currentRect.top - anchorPointOffsetTop
				mainRect.bottom = mainRect.top + mainRect.height
			}
		}
	}
	/**
	 * 修正横向定位
	 **/
	if (currentRect.right + mainRect.width >= viewClientWidth) {
		mainRect.left = currentRect.left - mainRect.width - anchorPointOffsetLeft
		mainRect.right = mainRect.left + mainRect.width
	} else {
		mainRect.left = currentRect.right - anchorPointOffsetLeft
		mainRect.right = mainRect.left + mainRect.width
	}

	mainElement.style.left = `${mainRect.left}px`
	mainElement.style.top = `${mainRect.top}px`
	mainElement.style.height = `${mainRect.height}px`
	mainElement.classList.add('ctxmenu-show-menu')
	mainElement.style.visibility = null as unknown as string
	mainElement.style.opacity = null as unknown as string
}

function setSubMenuListHide(panelWrapperElement: HTMLElement): void {
	const mainElement: HTMLElement = panelWrapperElement.querySelector('main') as HTMLElement
	if (!mainElement) {
		return
	}
	if (isMouseLeaveContainer(mainElement)) {
		return
	}
	mainElement.classList.remove('ctxmenu-show-menu')
	mainElement.style.display = 'none'
}
