import React from 'react'
import ReactDOMClient from 'react-dom/client'
import { ROOT_PREFIEX_TAG } from '../config/config'
import { TOpenContextMenu } from '../types/type'
import { rootElementBlurEventHandler, unmountContextmenu } from '../utils/rootElementEventHandler'
import ContextMenuRoot from './ContextMenuRoot'

let id: number = 0

export class ContextMenu {
	static open(params: TOpenContextMenu): void {
		const rootElement: HTMLElement = document.createElement('div')
		const domId: string = ROOT_PREFIEX_TAG + id++
		rootElement.id = domId
		rootElement.style.position = 'static'
		rootElement.style.left = '0'
		rootElement.style.top = '0'
		rootElement.setAttribute('tabIndex', '0')
		const root = ReactDOMClient.createRoot(rootElement)
		root.render(
			<ContextMenuRoot
				{...params}
				unmount={(): void => {
					unmountContextmenu(rootElement)
				}}
			/>
		)
		document.body.appendChild(rootElement)
		const htmlRoot: HTMLElement = document.getElementById(domId) as HTMLElement
		;(htmlRoot as any).root = root
		if (htmlRoot) {
			htmlRoot.addEventListener('blur', rootElementBlurEventHandler)
			htmlRoot.focus()
		}
	}
}
