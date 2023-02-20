import React, { useEffect, useState, useRef, useCallback } from 'react'
import { OpenContextMenu } from '../../../../componnet/ctxmenu/modules/Container'
import ContextmenuData from './config'

function ContextmenuNoraml(props: any): React.ReactElement {
	const elementRef: { current: any } = useRef<HTMLElement>(null)

	const onContextmenuAction = useCallback((e: MouseEvent): void => {
		e.preventDefault()
		e.stopPropagation()
		OpenContextMenu({
			data: ContextmenuData,
			position: { x: e.clientX, y: e.clientY },
			onClick: (menuItem: any, e: any): boolean | void => {
				console.log(menuItem, e)
				if (menuItem.cmd === '1-2-2-2') {
					return false
				}
			},
		})
	}, [])

	useEffect((): (() => void) => {
		elementRef.current.addEventListener('contextmenu', onContextmenuAction, false)
		return (): void => {
			elementRef.current.removeEventListener('contextmenu', onContextmenuAction)
			elementRef.current = undefined
		}
	}, [])

	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 标准模式</h3>
			<div ref={elementRef} style={{ width: '100%', height: '500px', backgroundColor: '#efefef' }}></div>
		</section>
	)
}

export default React.memo(ContextmenuNoraml)
