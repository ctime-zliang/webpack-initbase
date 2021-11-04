const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	/*
		启用压缩, 默认 true 
	*/
	minimizer: [
		new UglifyjsWebpackPlugin({
			/* 
				test: 匹配需要压缩的文件
				include:  指定包含
				exclude:  指定不包含
				*/
			/*
				启用或关闭缓存
				设置一个合法的路径值赋给该字段将用于指定一个缓存输出目录 
			*/
			cache: true,
			/* 
				启用多线程
				设置一个数字值赋给该字段用于指定最大并发数
			*/
			parallel: true,
			sourceMap: false,
			/* 
				提取注释
			*/
			extractComments: true,
			/*
				返回 true/false 以控制对某个输出文件进行压缩/不压缩 
			*/
			chunkFilter(chunk) {
				console.log(`=====>>>>> uglifyjs-webpack-plugin: ${chunk.name}`)
				return true
			},
		}),
	],
	/*
		分割打包 
	 */
	splitChunks: {
		/*
			async - 分割打包异步代码/文件
			all - 分割打包所有代码/文件
			initial - 分割打包异步、同步代码, 但异步内代码不再区分异步同步
		 */
		chunks: `all`,
		/*
			生成 chunk 的最小体积 
		 */
		minSize: 30000,
		automaticNameDelimiter: `.`,
		cacheGroups: {
			/* 
				抽离公共模块
			 */
			default: {
				name: `common`,
				chunks: `all`,
				minChunks: 2,
				priority: -10,
				reuseExistingChunk: true,
			},
			/*
				抽离 node_modules 中的公共依赖到独立的文件 
			 */
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				name: `vendors`,
				chunks: `all`,
				priority: -9,
				reuseExistingChunk: true,
			},
			// react: {
			// 	test(module) {
			// 		return /react/.test(module.context)
			// 	},
			// 	name: `react`,
			// 	chunks: `all`,
			// 	priority: -8
			// }
		},
	},
}
