import './assets/css/bootstrap.less'
import './assets/css/prefix.less'

export const getNowTime = () => {
	return new Date().getTime()
}

export const createAndAppendIamge = (src) => {
	const imgElement = document.createElement(`img`)
	imgElement.onload = function(evte) {
		document.body.appendChild(imgElement)
	}
	imgElement.src = src
}
