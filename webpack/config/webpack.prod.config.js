const path = require('path')
const { merge } = require('webpack-merge')
const utils = require('../../config/utils')
const webpackPlugins = require('./webpack.plugins')
const webpackBaseConfig = require('./webpack.base.config')
const webpackDevServerConfig = require('./webpack.dev-server.config')
const webpackOptimization = require('./webpack.optimization')

const webpackDevConfig = {
	mode: `production`,
	target: `web`,
	/* 
        出口配置
			1. 多入口单出口时, 即报错: Multiple chunks emit assets to the same filename ${filename}
     */
	output: {
		/* 配置输出根目录 */
		path: utils.resolveDirectory(`./webpack/dist/prod-build`),
		/* 配置生成文件名(可带路径) */
		filename: `scripts/[name].[hash:8].js`,
		// filename: `scripts/bundle.js`,
		/* 
			在未配置 webpack.optimization 时, webpack 对于形如 import 的动态模块引入打包将使用已配置的 output.chunkFilename 规则来生成文件
		 */
		chunkFilename: `scripts/chunks.[chunkhash:8].js`,
	},
	devServer: webpackDevServerConfig,
	plugins: [...webpackPlugins(`production`)],
	/*
		优化配置 
	 */
	optimization: { ...webpackOptimization },
}

module.exports = merge(webpackDevConfig, webpackBaseConfig)
