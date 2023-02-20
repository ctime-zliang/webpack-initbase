import React, { useCallback } from 'react'
import { TMenuItemProps } from '../types/type'
import { menuItemElementMouseenterEventHandler, menuItemElementMouseleaveEventHandler } from '../utils/menuItemEventHandler'

function MenuItem(props: TMenuItemProps): React.ReactElement {
	const { nowMenuItem, isCreateSubMenu, createSubMenu, onClickAction } = props

	const onMenuItemClickAction = (e: React.MouseEvent): void => {
		const currentTarget: HTMLElement = e.currentTarget as HTMLElement
		if (currentTarget) {
			if (currentTarget.nextElementSibling && currentTarget.nextElementSibling.tagName.toLocaleLowerCase() === 'ul') {
				return
			}
			onClickAction && onClickAction(nowMenuItem, e)
		}
	}
	const onWrapperMouseEnterAction = useCallback((e: React.MouseEvent): void => {
		menuItemElementMouseenterEventHandler(e.currentTarget as HTMLElement)
	}, [])
	const onWrapperMouseLeaveAction = useCallback((e: React.MouseEvent): void => {
		let currenttarget: HTMLElement = e.currentTarget as HTMLElement
		window.setTimeout((): void => {
			menuItemElementMouseleaveEventHandler(currenttarget)
		})
	}, [])

	return (
		<li
			className={'ctxmenu-item' + (isCreateSubMenu ? ' ctxmenu-submenu' : '')}
			onMouseEnter={onWrapperMouseEnterAction}
			onMouseLeave={onWrapperMouseLeaveAction}
		>
			<div className={'ctxmenu-content' + (nowMenuItem.disabled ? ' ctxmenu-content-disabled' : '')} onClick={onMenuItemClickAction}>
				<div className="content-tags"></div>
				<div className="content-text">{nowMenuItem.title}</div>
				<div className="content-keys"></div>
				<div className="content-exts"></div>
			</div>
			{createSubMenu
				? createSubMenu({
						subMenuItems: nowMenuItem.subMenu || [],
						isSubMenu: true,
						onClickAction: onClickAction,
				  })
				: null}
		</li>
	)
}

export default React.memo(MenuItem)
