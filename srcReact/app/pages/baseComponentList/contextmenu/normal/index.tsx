import React, { useEffect, useState, useRef, useCallback } from 'react'
import { EContextPanelAlignment, EContextMenuType } from '../../../../componnet/contextmenu/config/enum'
import { TContextMenuItem } from '../../../../componnet/contextmenu/types/type'
import ContextMenu from '../../../../componnet/contextmenu'
import contextmenuData from './config'

function ContextmenuNoraml(props: any): React.ReactElement {
	const elementRef: { current: any } = useRef<HTMLElement>(null)

	const onContextmenuAction = useCallback((e: React.MouseEvent): void => {
		e.preventDefault()
		e.stopPropagation()
		const menuData: Array<TContextMenuItem> = JSON.parse(JSON.stringify(contextmenuData))
		/* ... */
		// menuData.push({ type: EContextMenuType.SEPARATOR })
		// for (let i: number = 0; i < 50; i++) {
		// 	menuData.push({ title: `ContextmenuItem ${i}`, cmd: `contextmenu${i}` })
		// }
		menuData[9].subMenu?.push({ type: EContextMenuType.SEPARATOR })
		for (let i: number = 0; i < 50; i++) {
			menuData[9].subMenu?.push({ title: `ContextmenuItem ${i}`, cmd: `contextmenu${i}` })
		}
		/* ... */
		ContextMenu.open({
			data: menuData,
			panelAlignment: EContextPanelAlignment.RIGHT_TOP,
			// panelMaxHeight: 300,
			position: { x: e.clientX, y: e.clientY },
			onClick: (menuItem: TContextMenuItem, e: React.MouseEvent): boolean | void => {
				console.log(menuItem, e)
				if (menuItem.cmd === 'refresh') {
					console.log(`此项操作将设置右键菜单持续显示.`)
					return false
				}
			},
		})
	}, [])

	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 标准模式</h3>
			<div ref={elementRef} style={{ width: '100%', height: '500px', backgroundColor: '#efefef' }} onContextMenu={onContextmenuAction}></div>
		</section>
	)
}

export default React.memo(ContextmenuNoraml)
