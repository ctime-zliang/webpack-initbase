const path = require('path')
const utils = require('../../config/utils')
const rules = require('./webpack.rules')

console.log(`__dirname: `, __dirname)
console.log(`process.cwd: `, process.cwd())

const webpackDevConfig = {
	/* 
        入口配置
     */
	entry: utils.resolveDirectory(`./src/main.js`),
	// entry: {
	// 	// main: utils.resolveDirectory(`./src/main.js`),
	// 	// index: utils.resolveDirectory(`./src/index.js`),
	// 	// index: [
	// 	// 	utils.resolveDirectory(`./src/index.js`),
	// 	// 	utils.resolveDirectory(`./src/main.js`),
	// 	// ]
	// },
	module: {
		rules,
	},
	/*
		定义 loader 的引入目录范围 
	 */
	resolveLoader: {
		modules: ['node_modules', utils.resolveDirectory('./webpack/config/user-webpack-loaders')],
	},
}

module.exports = webpackDevConfig
