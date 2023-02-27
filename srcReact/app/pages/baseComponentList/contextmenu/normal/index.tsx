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
			// panelAlignment: EContextPanelAlignment.RIGHT_TOP,
			// panelMaxHeight: 300,
			position: { x: e.clientX, y: e.clientY },
			onClick: (menuItem: TContextMenuItem, e: React.MouseEvent): boolean | void => {
				console.log(menuItem, e)
				if (menuItem.cmd === 'refresh') {
					window.location.reload()
					// 返回 false 将屏蔽右键菜单的自动关闭功能
					// return false
				}
			},
		})
	}, [])

	return (
		<section style={{ padding: `5px 5px 5px 5px`, height: '100%' }}>
			<div ref={elementRef} style={{ width: '100%', height: '100%', backgroundColor: '#efefef' }} onContextMenu={onContextmenuAction}>
				<span>灰色矩形区域内右键唤起右键菜单</span>
			</div>
		</section>
	)
}

export default React.memo(ContextmenuNoraml)
