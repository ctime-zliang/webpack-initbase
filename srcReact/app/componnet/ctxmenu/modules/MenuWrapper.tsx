import React from 'react'
import { TMenuItem, TMenuWrapperProps } from '../types/type'
import MenuItem from './MenuItem'
import Separator from './Separator'

function MenuWrapper(props: TMenuWrapperProps): React.ReactElement {
	const { subMenuItems = [], isSubMenu = false, onClickAction } = props
	return (
		<ul className={isSubMenu ? 'ctxmenu-wrapper' : 'ctxmenu-wrapper ctxmenu-show-menu'}>
			{subMenuItems.map((menuItem: TMenuItem, index: number): React.ReactElement => {
				if (menuItem['type'] === 'item') {
					return <MenuItem key={index} nowMenuItem={menuItem} isCreateSubMenu={false} onClickAction={onClickAction} />
				}
				if (menuItem['type'] === 'submenu') {
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
				if (menuItem['type'] === 'separator') {
					return <Separator key={index} menuItem={menuItem} />
				}
				return <div key={index}>{menuItem['type']}</div>
			})}
		</ul>
	)
}

export default React.memo(MenuWrapper)
