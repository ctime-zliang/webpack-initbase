const path = require('path')
const { merge } = require('webpack-merge')
const utils = require('../../config/utils')
const webpackPlugins = require('./webpack.plugins')
const webpackBaseConfig = require('./webpack.base.config')
const webpackDevServerConfig = require('./webpack.dev-server.config')
const webpackOptimization = require('./webpack.optimization')

const webpackDevConfig = {
	mode: `development`,
	/* 
        出口配置
			1. 多入口单出口时, 即报错: Multiple chunks emit assets to the same filename ${filename}
     */
	output: {
		/* 配置输出根目录 */
		path: utils.resolveDirectory(`./webpack/dist/dev-build`),
		/* 配置生成文件名(可带路径) */
		filename: `scripts/[name].[hash:8].js`,
		// filename: `scripts/bundle.js`,
		/* chunk */
		chunkFilename: `scripts/[name].chunk.js`,
	},
	devServer: webpackDevServerConfig,
	plugins: [...webpackPlugins],
	/*
		优化配置 
	 */
	optimization: { ...webpackOptimization },
}

module.exports = merge(webpackDevConfig, webpackBaseConfig)
