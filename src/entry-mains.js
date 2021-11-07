import runProfile from '@/config/run.ini'
import '@/assets/css/common.less'
import log2xPng from '@/assets/images/log.2x.png'
import { ccc } from './utils/utils'
import { powerValue } from './utils/math'

function importLodash() {
	import('lodash').then(res => {
		console.log(res)
	})
}

function main() {
	console.log(process.env.NODE_ENV)
	console.log(runProfile)
	console.log(log2xPng)
	console.log(ccc({ aaa: 1 }))
	importLodash()
}

main()
