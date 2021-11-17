module.exports = api => {
	/*
		开启缓存, 否则编译可能报错 
	 */
	api.cache(true)
	return {
		presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
		plugins: [
			[
				'@babel/plugin-proposal-decorators',
				{
					legacy: true,
				},
			],
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-transform-runtime',
			'@babel/plugin-transform-modules-commonjs',
		].filter(Boolean),
	}
}
