const fs = require('fs')
const path = require('path')

const ApplicationDirectory = fs.realpathSync(process.cwd())

module.exports = {
	resolveDirectory(relativePath) {
		return path.resolve(ApplicationDirectory, relativePath)
	},
	timeStamp() {
		const d = new Date()
		const arr = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]
		return arr
			.map(item => {
				return item > 9 ? String(item) : '0' + String(item)
			})
			.join('')
	},
	clientOnly() {
		return process.argv.includes('client-only=true')
	},
	createLoaderResult(string, isEsm = false) {
		const prefix = isEsm ? 'export default ' : 'module.exports = '
		return prefix + string
	},
	getStringExportContent(exportString) {
		try {
			if (/module.exports(.*)/gi.test(exportString)) {
				return exportString.replace(/module.exports(\s+)=(\s+)/gi, '')
			}
			if (/export default(.*)/gi.test(exportString)) {
				return exportString.replace(/export default(\s+)/gi, '')
			}
		} catch (e) {
			console.log(e)
			return null
		}
	},
}
