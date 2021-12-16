const path = require('path')
const utils = require('../../config/utils')
const rules = require('./webpack.rules')
const stats = require('./webpack.stats')

console.log(`__dirname: `, __dirname)
console.log(`process.cwd: `, process.cwd())

const webpackBaseConfig = {
	name: `client`,
	target: `web`,
	/* 
		启用缓存
	 */
	cache: {
		/* 文件缓存 */
		type: `filesystem`,
	},
	/* 
        入口配置
     */
	// entry: utils.resolveDirectory(`./src/entry-mains.tsx`),
	entry: {
		main: utils.resolveDirectory(`./src/entry-mains.tsx`),
		// index: utils.resolveDirectory(`./src/entry-index.tsx`),
		// index: [
		// 	utils.resolveDirectory(`./src/index.js`),
		// 	utils.resolveDirectory(`./src/main.js`),
		// ]
	},
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
		// mainFields: ['main', 'index', 'browser'],
		/*
			引入目录模块时, 需要从入口文件开始读取, 此即配置该入口文件名的名称 
		 */
		// mainFiles: ['index'],
		/*
			定义三方包的查找范围(数组顺序决定优先级)
		 */
		modules: ['node_modules'],
		/*
			配置描述第三方模块的文件名称 
		 */
		descriptionFiles: ['package.json'],
		/* 
			强制在引入模块时必须补充文件后缀名
		 */
		enforceExtension: false,
	},
	performance: {
		hints: `warning`,
		/*
			生成文件的最大体积 
		 */
		maxAssetSize: 40000000,
		/*
			入口起点的最大体积 
		 */
		maxEntrypointSize: 60000000,
		// assetFilter(assetFilename) {
		// 	return !(/\.map$/.test(assetFilename))
		// },
	},
	stats,
}

module.exports = webpackBaseConfig
