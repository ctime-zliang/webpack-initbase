const jsxBabelLoader = {
	test: /\.js[x]?$/,
	exclude: /node_modules/,
	loader: 'babel-loader',
}

module.exports = [
	{
		oneOf: [jsxBabelLoader],
	},
]
