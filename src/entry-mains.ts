import runProfile from '@/config/run.ini'
import log2xPng from '@/assets/images/log.2x.png'
import { ccc } from '@/utils/utils'
import '@/assets/style/prefix.less'
import '@/assets/style/bootstrap.less'
import list from '@/modules/list'

function importLodash() {
	import('lodash').then(res => {
		console.log(res)
	})
}

function app() {
	const listRes = list()
}

function main() {
	console.log(`运行环境: `, process.env.NODE_ENV)
	console.log(`运行配置: `, runProfile)
	console.log(`log.2x.png 编译文件路径: `, log2xPng)
	console.log(ccc({ aaa: 1 }))
	importLodash()
	app()
}

main()
