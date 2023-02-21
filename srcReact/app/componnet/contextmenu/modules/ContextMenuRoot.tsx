import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { TBoundingClientRectResultToJSONResult, TContextMenuRootProps, TMenuItem } from '../types/type'
import MenuWrapper from './MenuWrapper'
import '../styles/index.less'

function ContextMenuRoot(props: TContextMenuRootProps): React.ReactElement {
	const { data, position, unmount, onClick } = props
	const containerRef: { current: any } = useRef<HTMLElement>(null)

	const onClickAction = (menuItem: TMenuItem, e: React.MouseEvent): void => {
		let outClickActionRes: boolean | void = true
		if (menuItem.disabled) {
			return
		}
		if (onClick instanceof Function) {
			outClickActionRes = onClick(menuItem, e)
		}
		if ((outClickActionRes as boolean) === false) {
			return
		}
		window.setTimeout((): void => {
			unmount()
		})
	}
	const onMouseenterAction = (e: React.MouseEvent): void => {
		if (containerRef.current) {
			containerRef.current.removeAttribute('mouselave')
		}
	}
	const onMouseleaveAction = (e: React.MouseEvent): void => {
		if (containerRef.current) {
			containerRef.current.setAttribute('mouselave', 'true')
		}
	}

	useLayoutEffect((): void => {
		if (containerRef.current) {
			const menuWrapper: HTMLElement = containerRef.current.firstElementChild
			const menuWrapperRect: TBoundingClientRectResultToJSONResult = menuWrapper.getBoundingClientRect().toJSON()
			if (menuWrapperRect.left + menuWrapperRect.width > document.documentElement.clientWidth) {
				containerRef.current.style.left = document.documentElement.clientWidth - menuWrapperRect.width + 'px'
			}
			if (menuWrapperRect.top + menuWrapperRect.height > document.documentElement.clientHeight) {
				containerRef.current.style.top = document.documentElement.clientHeight - menuWrapperRect.height + 'px'
			}
		}
	}, [])

	return (
		<div
			ref={containerRef}
			className="ctxmenu-container"
			style={{ left: position.x + 'px', top: position.y + 'px' }}
			onMouseLeave={onMouseleaveAction}
			onMouseEnter={onMouseenterAction}
		>
			<MenuWrapper subMenuItems={data} isSubMenu={false} onClickAction={onClickAction} />
		</div>
	)
}

export default React.memo(ContextMenuRoot)
