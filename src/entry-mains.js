import runProfile from './config/run.ini'
import './assets/css/common.less'
import { getNowTime, createAndAppendIamge } from './style'
import log2xPng from './assets/images/log.2x.png'

console.log(runProfile)

const fn = () => {
	console.log(`main, ${getNowTime()}`)
}
fn()

createAndAppendIamge(log2xPng)
