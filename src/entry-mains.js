import runProfile from '@/config/run.ini'
import log2xPng from '@/common/images/log.2x.png'
import { ccc } from './utils/utils'
import { powerValue } from './utils/math'
import '@/common/style/prefix.less'
import '@/common/style/bootstrap.less'
import list from '@/modules/list'

function importLodash() {
	import('lodash').then(res => {
		console.log(res)
	})
}

function app() {
	const listRes = list()
	console.log(listRes)
}

function main() {
	console.log(process.env.NODE_ENV)
	console.log(runProfile)
	console.log(log2xPng)
	console.log(ccc({ aaa: 1 }))
	importLodash()
	app()
}

main()
