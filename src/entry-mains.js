import runProfile from '@/config/run.ini'
import '@/assets/css/common.less'
import log2xPng from '@/assets/images/log.2x.png'
import { sortBy } from './utils/utils'

function importLodash() {
	import('lodash').then(res => {
		console.log(res)
	})
}

const data = [{ value: `dwww` }, { value: `fe` }, { value: `ad` }, { value: `grd` }]

function main() {
	console.log(process.env.NODE_ENV)
	console.log(runProfile)
	console.log(log2xPng)
	console.log(data.sort(sortBy([`value`])))
	importLodash()
}

main()
