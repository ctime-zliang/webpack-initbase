import runProfile from './config/run.ini'
import './assets/css/common.less'
import { getNowTime } from './style'

console.log(runProfile)

const fn = () => {
	console.log(`main, ${getNowTime()}`)
}
fn()
