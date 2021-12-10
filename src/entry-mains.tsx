import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
// import runProfile from '@/config/run.ini'
// import log2xPng from '@/assets/images/log.2x.png'
import '@/assets/style/prefix.less'
// import '@/assets/style/bootstrap.less'
// import decorator from '@/utils/decorator/decorator'
import { sleep } from '@/utils/utils'
import { requestByGet, TRequestResponse } from '@/utils/request'
import EventBus from '@/utils/EventBus'
import ColorTool from '@/utils/Color.Tool'

const colorTool: ColorTool = new ColorTool()

export function importLodash() {
	import('lodash').then(res => {
		console.log(res)
	})
}

function renderReactApp() {
	ReactDOM.render(<App />, document.getElementById('app'))
}

export async function wait() {
	await sleep(2000)
	console.log(`End Sleep.`)
}

async function fetchJson() {
	const res: TRequestResponse = await requestByGet(`http://www.dell-lee.com/react/api/demo.json`)
	EventBus.emit(`fetchJson`, { ...res })
	return res
}

export async function main() {
	renderReactApp()

	console.log(colorTool.setHex2RGBA(`#ff6600`))

	// console.log(`运行环境: `, process.env.NODE_ENV)
	// console.log(`运行配置: `, runProfile)
	// console.log(`log.2x.png 编译文件路径: `, log2xPng)

	// importLodash()
	// decorator()
	// await wait()

	EventBus.on(`fetchJson`, (res: any) => {
		console.log(`fetchJson`, res.data)
	})

	fetchJson()
	return true
}

main()
