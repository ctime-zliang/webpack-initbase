const utils = require('../../config/utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const HelloPlugin = require('./user-webpack-plugins/hello-plugins')

module.exports = [
	/*
		自动生成一个可访问的 html 文件并将资源文件引入 
	 */
	new HtmlWebpackPlugin({
		title: 'Webpack Build Test',
		filename: `./index.html`,
		template: utils.resolveDirectory('./src/template/index.ejs'),
		// templateContent(templateParams, compilation, callback) {
		// 	// Return your template content asynchronously here
		// 	callback(null, '..')
		// },
		favicon: utils.resolveDirectory('./src/assets/images/log.jpg'),
		inject: true,
		hash: false,
		cache: true,
		showErrors: true,
	}),
	/*
		压缩输出 js 文件 
	 */
	// new UglifyjsWebpackPlugin(),
	/* 
		用户自定义插件
	 */
	new HelloPlugin({ name: 'c.zliang' }),
]
