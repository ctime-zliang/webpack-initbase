import React, { useCallback } from 'react'
import CheckTags from '../component/CheckTags'
import { TMenuItemProps } from '../types/type'
import { menuItemElementMouseenterEventHandler, menuItemElementMouseleaveEventHandler } from '../utils/menuItemEventHandler'
import MenuItemContent from './MenuItemContent'

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
		const currenttarget: HTMLElement = e.currentTarget as HTMLElement
		// e.stopPropagation()
		window.setTimeout((): void => {
			menuItemElementMouseleaveEventHandler(currenttarget)
		})
	}, [])

	return (
		<li
			className={'ctxmenu-item' + (isCreateSubMenu ? ' ctxmenu-submenu' : '') + (nowMenuItem.disabled ? ' ctxmenu-item-disabled' : '')}
			onMouseEnter={onWrapperMouseEnterAction}
			onMouseLeave={onWrapperMouseLeaveAction}
		>
			<div className={'ctxmenu-content'} onClick={onMenuItemClickAction}>
				<div className="content-checktags" style={{ display: nowMenuItem.isHideChecked ? 'none' : 'block' }}>
					{nowMenuItem.checked ? <CheckTags /> : null}
				</div>
				<div className="content-text">
					<MenuItemContent {...nowMenuItem} />
				</div>
				<div className="content-tips" style={{ display: nowMenuItem.isHideTips ? 'none' : 'block' }}>
					{nowMenuItem.tips}
				</div>
				<div className="content-exts">{isCreateSubMenu ? <i className="ctxmenu-exts-icon" /> : null}</div>
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
