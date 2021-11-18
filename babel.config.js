// const babel = require('@babel/core')

// const sourceCodeString = `
// 	let num = 1
// `
// babel.transform(
// 	sourceCodeString,
// 	{
//     	configFile: './babel.config.js'
// 	},
// 	(err, result) => {
//     	const { code, ast } = result
// 	}
// )

/*
	在项目根目录建立 babel.config.js
		babel.config.js 可以对 node_modules 和 symlinked packages 内的文件进行转码
		.babelrc(.js) 无法实现该功能

	https://blog.liuyunzhuge.com/2019/09/09/babel%E8%AF%A6%E8%A7%A3%EF%BC%88%E4%B8%83%EF%BC%89-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6/
	.babelrc .babelrc.js 以及 package.json 中的 babel,  babel7 重新调整了这种配置的默认搜索行为:
		从当前正在编译的文件所在目录开始(基于它的 filename), 向上搜索父级文件夹中包含的 .babelrc(或 .babelrc.js, 以及 package.json 中 babel 配置节), 找到则停止搜索
			- 往上搜索过程中, 如果在某一层找到了 package.json, 即停止搜索; 这种配置的作用范围限定在单个的 package 内(babel 用 package.json 来划定package的范围)
			- 这种搜索行为找到的配置, 如 .babelrc 文件, 必须位于 babel 运行的 root 目录下，或者是包含在 babelrcRoots 这个 option 配置的目录下, 否则找到的配置会直接被忽略
 */
module.exports = api => {
	/*
		开启缓存, 否则编译可能报错 
	 */
	api.cache(true)
	return {
		// babelrcRoots: ['.'],
		/*
			presets 列表中的各 preset 将被逆序启用
		 */
		presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
		/*
			plugins 参数格式:
				- 数组形式, 元素类型可为:
					- 纯字符串格式, 即插件名
					- 数组:
						- 第一个参数为纯字符串, 即插件名
						- 第二个参数为 options, 即插件参数 
			plugin 插件名缩写
				以 babel-plugin- 开头的插件命名, 使用时省略 babel-plugin-, 即 babel-plugin-hello-plugin 等价于 hello-plugin
			plugins 列表中的各 plugin 将被顺序启用, 且先于 presets 被调用
		 */
		plugins: [
			[
				'@babel/plugin-proposal-decorators',
				{
					/*
						是否启用松散模式的代码转换
							构建产物可能不会严格遵循 ES 规范 
					 */
					// loose: false,
					/*
						是否启用更加符合 ES 规范的代码转换
							提升代码质量
					 */
					// spec: false,
					/*
						是否使用保守实现来对代码中新特性做代码等价转换 
					 */
					legacy: true,
					/*
						转换过程中尽可能使用当前宿主已支持的实现, 而非 polyfill 
					 */
					// useBuiltIns: false
				},
			],
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-transform-runtime',
			'@babel/plugin-transform-modules-commonjs',
		].filter(Boolean),
	}
}
