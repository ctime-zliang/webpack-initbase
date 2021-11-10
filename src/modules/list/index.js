import styles from './index.module.css'

function appendChildElement(container, className, htmlString) {
    const divElement = document.createElement(`div`)
    divElement.classList.add(className)
    divElement.innerHTML = htmlString
    container.appendChild(divElement)
    return divElement
}

export default () => {
    appendChildElement(document.body, styles[`log1x`], `<span style="color: red;">log1x div element</span>`)
    appendChildElement(document.body, styles[`log2x`], `<span style="color: red;">log2x div element</span>`)
    return true
}