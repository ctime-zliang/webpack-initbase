const iniLoader = {
	test: /\.ini$/,
	exclude: /node_modules/,
	use: [
		{
			loader: 'ini-translate-loader',
		},
		{
			loader: 'ini-parser-loader',
			options: {
				timeStamp: new Date().getTime(),
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
	// loader: 'babel-loader',  // use: 'babel-loader'
	use: [
		{
			loader: 'babel-loader',
		},
	],
}
const lessLoader = {
	test: /\.less$/,
	exclude: /node_modules/,
	use: [
		{
			/*
                创建 <style /> 并写入 style-text 
             */
			loader: 'style-loader',
		},
		{
			/* 
                处理 @import/url 语句或标识符
             */
			loader: 'css-loader',
		},
		{
			/* 
                需一并安装 less
             */
			loader: 'less-loader',
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

module.exports = [
	{
		oneOf: [jsxBabelLoader, lessLoader, iniLoader],
	},
]
