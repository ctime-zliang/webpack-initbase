import React, { useCallback, useEffect, useRef } from 'react'
import { TBoundingClientRectResultToJSONResult, TMenuItemProps } from '../types/type'

function MenuItem(props: TMenuItemProps): React.ReactElement {
	const { nowMenuItem, isCreateSubMenu, createSubMenu, onClick } = props
	const wrapperRef: { current: any } = useRef<HTMLElement>(null)
	const onWrapperMouseEnterAction = useCallback((e: MouseEvent): void => {
		const currentElement: HTMLElement = e.currentTarget as HTMLElement
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
	}, [])
	const onWrapperMouseLeaveAction = useCallback((e: MouseEvent): void => {
		const currentElement: HTMLElement = e.currentTarget as HTMLElement
		const ulElement: HTMLElement = currentElement.querySelector('ul') as HTMLElement
		if (!ulElement) {
			return
		}
		ulElement.classList.remove('ctxmenu-show-menu')
		ulElement.style.display = 'none'
	}, [])

	useEffect((): (() => void) => {
		if (!wrapperRef.current) {
			return wrapperRef.current
		}
		wrapperRef.current.addEventListener('mouseenter', onWrapperMouseEnterAction, false)
		wrapperRef.current.addEventListener('mouseleave', onWrapperMouseLeaveAction, false)
		return (): void => {
			wrapperRef.current.removeEventListener('mouseenter', onWrapperMouseEnterAction)
			wrapperRef.current.removeEventListener('mouseleave', onWrapperMouseLeaveAction)
			wrapperRef.current = undefined
		}
	}, [])

	return (
		//@ts-ignore
		<li ref={wrapperRef} className={'ctxmenu-item' + (isCreateSubMenu ? ' ctxmenu-submenu' : '')}>
			<div className={'ctxmenu-content' + (nowMenuItem.disabled ? ' ctxmenu-content-disabled' : '')}>
				<div className="content-tags"></div>
				<div className="content-text">{nowMenuItem.title}</div>
				<div className="content-keys"></div>
				<div className="content-exts"></div>
			</div>
			{createSubMenu
				? createSubMenu({
						subMenuItems: nowMenuItem.subMenu || [],
						isSubMenu: true,
						onClick: onClick,
				  })
				: null}
		</li>
	)
}

export default React.memo(MenuItem)
