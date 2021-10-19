const { merge } = require('webpack-merge')
const webpackPlugins = require('./webpack.plugins')
const webpackBaseConfig = require('./webpack.base.config')
const webpackDevServerConfig = require('./webpack.dev-server.config')

const webpackDevConfig = {
	devServer: webpackDevServerConfig,
	plugins: [...webpackPlugins],
}

module.exports = merge(webpackDevConfig, webpackBaseConfig)
