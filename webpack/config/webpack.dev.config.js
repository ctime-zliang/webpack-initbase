const path = require('path')
const utils = require('../../config/utils')
const { merge } = require('webpack-merge')
const webpackPlugins = require('./webpack.plugins')
const webpackBaseConfig = require('./webpack.base.config')
const webpackDevServerConfig = require('./webpack.dev-server.config')

const webpackDevConfig = {
	/* 
        出口配置
			1. 多入口单出口时, 即报错: Multiple chunks emit assets to the same filename ${filename}
     */
	output: {
		path: utils.resolveDirectory(`./webpack/dist/dev-build`),
		// filename: `scripts/build-[name]-[hash].js`,
		filename: `scripts/bundle.js`,
	},
	devServer: webpackDevServerConfig,
	plugins: [...webpackPlugins],
}

module.exports = merge(webpackDevConfig, webpackBaseConfig)
