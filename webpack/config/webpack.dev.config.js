const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('../../config/utils')
const webpackBaseConfig = require('./webpack.base.config')
const webpackDevServerConfig = require('./webpack.dev-server.config')

const webpackDevConfig = {
	devServer: webpackDevServerConfig,
	plugins: [
		new HtmlWebpackPlugin({
			filename: `./index.html`,
			template: utils.resolveDirectory('./src/template/index.ejs'),
			inject: true,
		}),
	],
}

module.exports = merge(webpackDevConfig, webpackBaseConfig)
