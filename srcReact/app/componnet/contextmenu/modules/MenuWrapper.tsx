import React from 'react'
import { EMenuType } from '../config/enum'
import { TMenuItem, TMenuWrapperProps } from '../types/type'
import MenuItem from './MenuItem'
import Separator from './Separator'

function MenuWrapper(props: TMenuWrapperProps): React.ReactElement {
	const { subMenuItems = [], isSubMenu = false, onClickAction } = props
	return (
		<ul className={isSubMenu ? 'ctxmenu-wrapper' : 'ctxmenu-wrapper ctxmenu-show-menu'}>
			{subMenuItems.map((menuItem: TMenuItem, index: number): React.ReactElement => {
				if (Array.isArray(menuItem.subMenu)) {
					return (
						<MenuItem
							key={index}
							nowMenuItem={menuItem}
							isCreateSubMenu={true}
							onClickAction={onClickAction}
							createSubMenu={MenuWrapper}
						/>
					)
				}
				if (menuItem['type'] === EMenuType.SEPARATOR) {
					return <Separator key={index} menuItem={menuItem} />
				}
				return <MenuItem key={index} nowMenuItem={menuItem} isCreateSubMenu={false} onClickAction={onClickAction} />
			})}
		</ul>
	)
}

export default React.memo(MenuWrapper)
