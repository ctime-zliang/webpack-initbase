import React from 'react'
import { EContextMenuType } from '../config/enum'
import { TMenuItem, TMenuWrapperProps } from '../types/type'
import MenuItem from './MenuItem'
import Separator from './Separator'

function MenuWrapper(props: TMenuWrapperProps): React.ReactElement {
	const { commanLink = undefined, subMenuItems = [], isSubMenu = false, onClickAction } = props
	return (
		<ul className={isSubMenu ? 'ctxmenu-wrapper' : 'ctxmenu-wrapper ctxmenu-show-menu'}>
			{subMenuItems.map((menuItem: TMenuItem, index: number): React.ReactElement => {
				const cmdlink: string = commanLink ? commanLink + ':' + menuItem.cmd : (menuItem.cmd as string)
				if (Array.isArray(menuItem.subMenu)) {
					return (
						<MenuItem
							key={index}
							commanLink={cmdlink}
							nowMenuItem={menuItem}
							isCreateSubMenu={true}
							onClickAction={onClickAction}
							createSubMenu={MenuWrapper}
						/>
					)
				}
				if (menuItem['type'] === EContextMenuType.SEPARATOR) {
					return <Separator key={index} menuItem={menuItem} />
				}
				return <MenuItem commanLink={cmdlink} key={index} nowMenuItem={menuItem} isCreateSubMenu={false} onClickAction={onClickAction} />
			})}
		</ul>
	)
}

export default React.memo(MenuWrapper)
