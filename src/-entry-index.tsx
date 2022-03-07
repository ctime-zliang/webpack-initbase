import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import runProfile from '@/config/run.ini'
import log2xPng from '@/assets/images/log.2x.png'
// import '@/assets/style/prefix.less'
// import '@/assets/style/bootstrap.less'
import '@/assets/style/common.a.less'
import '@/assets/style/common.b.less'
import logoImgView from '@/modules/logoImgView'

export async function main() {
	console.log(`运行环境: `, process.env.NODE_ENV)
	console.log(`运行配置: `, runProfile)
	console.log(`log.2x.png 编译文件路径: `, log2xPng)

	logoImgView()
	return true
}

main()
