import React from 'react'
import { TContextMenuRootProps } from '../types/type'
import MenuWrapper from './MenuWrapper'
import '../styles/index.less'

function ContextMenuRoot(props: TContextMenuRootProps): React.ReactElement {
	const { visible, data, position, hideMenu, onClick } = props
	const onClickAction = (e: React.MouseEvent): void => {
		const parentLiElem = (e.target as HTMLElement).closest('li.menu-item:not(.submenu)')
		if (parentLiElem) {
			onClick && onClick(e)
			hideMenu && hideMenu()
		}
	}
	return visible ? (
		<div className="ctxmenu-container" style={{ left: position.x + 'px', top: position.y + 'px' }}>
			<MenuWrapper subMenuItems={data} isSubMenu={false} onClick={onClickAction} />
		</div>
	) : (
		(null as unknown as React.ReactElement)
	)
}

export default React.memo(ContextMenuRoot)
