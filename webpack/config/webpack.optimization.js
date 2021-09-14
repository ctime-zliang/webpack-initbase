const { ESBuildMinifyPlugin } = require('esbuild-loader')

module.exports = {
	common: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
	client: {
		devBuild: {
			minimize: true,
			minimizer: [],
		},
		prodBuild: {
			minimize: true,
			minimizer: [
				// new ESBuildMinifyPlugin({
				// 	target: 'es2015',
				// 	minifyWhitespace: true,
				// }),
			],
		},
	},
	server: {},
}
