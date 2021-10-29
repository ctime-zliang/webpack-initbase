const utils = require('../../config/utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const HelloPlugin = require('./user-webpack-plugins/hello-plugins')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
		// favicon: utils.resolveDirectory('./src/assets/images/log.jpg'),
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
	/* 
		抽离 CSS 为单独的文件
	 */
	new MiniCssExtractPlugin({
		/* 配置生成文件名(可带路径) */
		filename: `assets-styles/style.[hash:8].css`,
		// filename: `styles/[name].css`,  // main.css
		/* 控制从打包后的非入口 JS 文件中提取 CSS 样式生成的 CSS 文件的名称 */
		chunkFilename: `assets-style/[name].chunk.css`,
		/*
			当
				在 1.js 中分别前后引入 a.css 和 b.css
				在 2.js 中分别前后引入 b.css 和 a.css
			则
				如果此项为 true, 则开启因顺序不一致的导致的警告, 反之则关闭警告
		 */
		ignoreOrder: false,
		/* 
			用于将附加的键值对属性数据写入到 <link /> 节点
				只适用于动态加载的 css chunk
		*/
		attributes: { id: `link${new Date().getTime()}` },
	}),
]
