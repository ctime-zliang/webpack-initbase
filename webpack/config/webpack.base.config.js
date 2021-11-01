const path = require('path')
const utils = require('../../config/utils')
const rules = require('./webpack.rules')

console.log(`__dirname: `, __dirname)
console.log(`process.cwd: `, process.cwd())

const webpackDevConfig = {
	target: `web`,
	/* 
        入口配置
     */
	entry: utils.resolveDirectory(`./src/entry-mains.js`),
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
	/*
		定义模块路径配置 
	 */
	resolve: {
		/*
			定义路径别名 
		 */
		alias: {
			'@': path.resolve('./src/'),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'vue'],
		/*
			在 node_modules 读取模块的 package.json 时需要优先读取的入口字段
		 */
		// mainFields: ['main', 'index'],
		/*
			引入目录模块时, 需要从入口文件开始读取, 此即配置该入口文件名的名称 
		 */
		// mainFiles: ['index'],
		/*
			定义三方包的查找范围(数组顺序决定优先级)
		 */
		modules: ['node_modules'], //
		/*
			配置描述第三方模块的文件名称 
		 */
		descriptionFiles: ['package.json'],
		/* 
			强制在引入模块时必须补充文件后缀名
		 */
		enforceExtension: false,
	},
}

module.exports = webpackDevConfig
