const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { ESBuildPlugin } = require('esbuild-loader')
const utils = require('./utils')

module.exports = {
	common: [
		new ESBuildPlugin(),
		new MiniCssExtractPlugin({
			filename: ``,
			chunkFilename: ``,
		}),
		new CaseSensitivePathsPlugin(),
		new TypedCssModulesPlugin({
			globPattern: 'src/**/*.(css|less|sass)',
		}),
		new webpack.ProgressPlugin(),
	],
	devBuild: [
		new webpack.DefinePlugin({
			'process.env.__CLIENT_ONLY__': JSON.stringify(process.argv.includes('client-only=true')),
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			IS_DEVELOPMETN: true,
		}),
		new HtmlWebpackPlugin({
			filename: ``,
			template: ``,
			inject: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	prodBuild: [
		new webpack.DefinePlugin({
			'process.env.__CLIENT_ONLY__': JSON.stringify(process.argv.includes('client-only=true')),
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			IS_DEVELOPMETN: false,
		}),
		new HtmlWebpackPlugin({
			filename: ``,
			template: ``,
			inject: true,
		}),
		new BundleAnalyzerPlugin({
			analyzerPort: 0,
		}),
	],
}
