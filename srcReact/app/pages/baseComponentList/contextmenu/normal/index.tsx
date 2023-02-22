import React, { useEffect, useState, useRef, useCallback } from 'react'
import ContextMenu from '../../../../componnet/contextmenu'
import ContextmenuData from './config'

function ContextmenuNoraml(props: any): React.ReactElement {
	const elementRef: { current: any } = useRef<HTMLElement>(null)

	const onContextmenuAction = useCallback((e: React.MouseEvent): void => {
		e.preventDefault()
		e.stopPropagation()
		ContextMenu.open({
			//@ts-ignore
			data: ContextmenuData,
			position: { x: e.clientX, y: e.clientY },
			onClick: (menuItem: any, e: any): boolean | void => {
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
