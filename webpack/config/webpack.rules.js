const MiniCssExtractPlugin = require(`mini-css-extract-plugin`)

const iniFileLoader = {
	test: /\.ini$/,
	exclude: /node_modules/,
	use: [
		{
			loader: `ini-translate-loader`,
			options: {
				loaderTitle: `ini-translate-loader`,
			},
		},
		{
			loader: `ini-parser-loader`,
			options: {
				loaderTitle: `ini-parser-loader`,
			},
		},
	],
}

const jsxBabelLoader = {
	test: /\.js[x]?$/,
	exclude: /node_modules/,
	// /*
	//     需一并安装 @babel/core
	//  */
	// loader: `babel-loader`,  // use: `babel-loader`
	use: [
		{
			loader: `babel-loader`,
		},
	],
}
const lessLoader = {
	test: /\.less$/,
	exclude: /node_modules/,
	use: [
		// {
		// 	/*
		// 		创建 <style /> 并写入 style-text
		// 	 */
		// 	loader: `style-loader`,
		// },
		{
			/* 
				提取 CSS 到单独的文件
			 */
			loader: MiniCssExtractPlugin.loader,
			options: {
				/* 
					设置 CSS 引用资源文件的前置路径
						将导致 CSS 代码内对资源的引用路径变成: `${publicPath}/${filename}`
				*/
				publicPath: `../images/`,
			},
		},
		{
			/*
				处理 @import url() 语句或标识符 
			 */
			loader: `css-loader`,
			options: {
				/* 模块化 */
				modules: false
			}
		},
		{
			/*
				需一并安装 less 
			 */
			loader: `less-loader`,
			options: {
				sourceMap: true,
				webpackImporter: true,
				// lessOptions: {
				//     strictMath: false,
				// }
				lessOptions(loaderContext) {
					return {
						strictMath: false,
					}
				},
			},
		},
	],
}

const urlImageFileLoader = {
	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	exclude: /node_modules/,
	use: [
		{
			loader: `url-loader`,
			options: {
				/* 配置生成文件名(可带路径) */
				name: `images/[name].[hash:8].[ext]`,
				/* 设置 base64 转换上限 */
				limit: 8192
			},
		},
	],
}

module.exports = [
	{
		oneOf: [jsxBabelLoader, urlImageFileLoader, lessLoader, iniFileLoader],
	},
]
