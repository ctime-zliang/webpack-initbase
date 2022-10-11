import React from 'react'
import ReactDOM from 'react-dom'
import jQuery from 'jquery'
import $ from 'jquery'
import App from '@/app/App'
import runProfile from '@/app/config/run.ini'
import log2xPng from '@/app/assets/images/log.2x.png'
// import '@/app/assets/style/prefix.less'
// import '@/app/assets/style/bootstrap.less'
import '@/app/assets/style/common.a.less'
import '@/app/assets/style/common.b.less'
import decorator from '@/app/utils/decorator/decorator'
import { requestByGet, TRequestResponse } from '@/app/utils/request'
import EventBus from '@/app/utils/EventBus'
import { renderReactApp } from '@/client'

function importLodash() {
	import('lodash').then((res: any): void => {
		console.log(res)
	})
}

async function fetchJson(): Promise<TRequestResponse> {
	const res: TRequestResponse = await requestByGet(`http://www.dell-lee.com/react/api/demo.json`)
	EventBus.emit(`fetchJson`, { ...res })
	return res
}

export async function main(): Promise<boolean> {
	console.log(jQuery, $)
	renderReactApp()

	console.log(`运行环境: `, process.env.NODE_ENV)
	console.log(`运行配置: `, runProfile)
	console.log(`log.2x.png 编译文件路径: `, log2xPng)

	importLodash()
	// decorator()

	EventBus.on(`fetchJson`, (res: any): void => {
		console.log(`fetchJson`, res)
	})

	fetchJson()
	return true
}

main()
