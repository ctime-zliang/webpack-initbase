import React from 'react'
import ReactDOM from 'react-dom'
import jQuery from 'jquery'
import $ from 'jquery'
import App from '@/App'
import runProfile from '@/config/run.ini'
import log2xPng from '@/assets/images/log.2x.png'
// import '@/assets/style/prefix.less'
// import '@/assets/style/bootstrap.less'
import '@/assets/style/common.a.less'
import '@/assets/style/common.b.less'
import decorator from '@/utils/decorator/decorator'
import { requestByGet, TRequestResponse } from '@/utils/request'
import EventBus from '@/utils/EventBus'
import logoImgView from '@/modules/logoImgView'

function importLodash() {
	import('lodash').then((res: any) => {
		console.log(res)
	})
}

function renderReactApp() {
	ReactDOM.render(<App />, document.getElementById('app'))
}

async function fetchJson() {
	const res: TRequestResponse = await requestByGet(`http://www.dell-lee.com/react/api/demo.json`)
	EventBus.emit(`fetchJson`, { ...res })
	return res
}

export async function main() {
	console.log(jQuery, $)
	renderReactApp()

	console.log(`运行环境: `, process.env.NODE_ENV)
	console.log(`运行配置: `, runProfile)
	console.log(`log.2x.png 编译文件路径: `, log2xPng)

	importLodash()
	logoImgView()
	// decorator()

	EventBus.on(`fetchJson`, (res: any): void => {
		console.log(`fetchJson`, res)
	})

	fetchJson()
	return true
}

main()
