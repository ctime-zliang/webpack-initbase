import runProfile from '@/config/run.ini'
import '@/assets/css/common.less'
import log2xPng from '@/assets/images/log.2x.png'

console.log(runProfile)
console.log(log2xPng)

const fn = () => {
	console.log(process.env.NODE_ENV)
	console.log(`main`)
}
fn()
