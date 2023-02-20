import React from 'react'
import ReactDOMClient from 'react-dom/client'
import ContextMenuRoot from './ContextMenuRoot'

export function OpenContextMenu(params: any): void {
	const { data } = params
	const htmlRoot: HTMLElement = document.body
	const rootElement: HTMLElement = document.createElement('div')
	rootElement.style.position = 'static'
	rootElement.style.left = '0'
	rootElement.style.top = '0'
	const root = ReactDOMClient.createRoot(rootElement)
	root.render(<ContextMenuRoot {...params} visible={true} />)
	htmlRoot.appendChild(rootElement)
}
