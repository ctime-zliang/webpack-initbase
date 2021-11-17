import { Button } from '@/public/button'
import styles from './index.module.css'

function appendChildElement(container: HTMLElement, className: string, htmlString: string) {
	const divElement = document.createElement(`div`)
	if (className) {
		divElement.classList.add(className)
	}
	if (htmlString) {
		divElement.innerHTML = htmlString
	}
	container.appendChild(divElement)
	return divElement
}

export default () => {
	appendChildElement(document.body, styles[`log1x`], `<span style="color: red;">log1x div element</span>`)
	appendChildElement(document.body, styles[`log2x`], `<span style="color: red;">log2x div element</span>`)
	appendChildElement(document.body, '.btn', Button({ textContent: `btn` }))
	return true
}
