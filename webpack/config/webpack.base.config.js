const path = require('path')
const utils = require('../../config/utils')

console.log(`__dirname: `, __dirname)
console.log(`process.cwd: `, process.cwd())

const webpackDevConfig = {
	/* 
        入口配置
     */
	// entry: utils.resolveDirectory(`./src/main.js`)
	entry: {
		main: utils.resolveDirectory(`./src/main.js`),
		index: utils.resolveDirectory(`./src/index.js`),
	},
	/* 
        出口配置
     */
	output: {
		path: utils.resolveDirectory(`./webpack/dist/dev-build`),
		filename: `build-[name].js`,
	},
}

module.exports = webpackDevConfig
