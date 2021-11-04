import runProfile from '@/config/run.ini'
import '@/assets/css/common.less'
import log2xPng from '@/assets/images/log.2x.png'
import { mAfn1 } from './modules/a'
import { mBfn1 } from './modules/b'

function importLodash() {
	import('lodash').then(res => {
		console.log(res)
	})
}

function main() {
	mAfn1()
	mBfn1()
	console.log(process.env.NODE_ENV)
	console.log(runProfile)
	console.log(log2xPng)
	importLodash()
}

main()
