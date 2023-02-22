import React, { useCallback } from 'react'
import CheckTags from '../component/CheckTags'
import { TContextMenuItemProps } from '../types/type'
import { menuItemElementMouseOverEventHandler } from '../utils/menuItemEventHandler'
import MenuItemContent from './MenuItemContent'

function MenuItem(props: TContextMenuItemProps): React.ReactElement {
	const { commanLink = undefined, nowMenuItem, isCreateSubMenu, createSubMenu, onClickAction } = props
	const cmdlink: string = commanLink ? commanLink : (nowMenuItem.cmd as string)

	const onMenuItemClickAction = (e: React.MouseEvent): void => {
		const currentTarget: HTMLElement = e.currentTarget as HTMLElement
		if (currentTarget) {
			if (currentTarget.nextElementSibling && currentTarget.nextElementSibling.tagName.toLocaleLowerCase() === 'ul') {
				return
			}
			const cmdlink: string = currentTarget.getAttribute('data-cmdlink') as string
			onClickAction && onClickAction({ ...nowMenuItem, cmdlink }, e)
		}
	}
	const onWrapperMouseOverAction = useCallback((e: React.MouseEvent): void => {
		menuItemElementMouseOverEventHandler(e.currentTarget as HTMLElement)
	}, [])

	return (
		<li
			className={'ctxmenu-item' + (isCreateSubMenu ? ' ctxmenu-submenu' : '') + (nowMenuItem.disabled ? ' ctxmenu-item-disabled' : '')}
			onMouseOver={onWrapperMouseOverAction}
			data-cmdlink={cmdlink}
		>
			<div className={'ctxmenu-content'} onClick={onMenuItemClickAction} data-cmdlink={cmdlink}>
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
						commanLink: cmdlink,
						subMenuItems: nowMenuItem.subMenu || [],
						isSubMenu: true,
						onClickAction: onClickAction,
				  })
				: null}
		</li>
	)
}

export default React.memo(MenuItem)
