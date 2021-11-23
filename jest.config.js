module.exports = {
	verbose: true,
	/*
		设置 jest 是否自动 mock 所有导入模块 
	 */
	automock: false,
	/*
		设置在每个测试前是否自动清理 mock 的调用和实例 instance 
	 */
	clearMocks: false,
	/*
		运行前置启动器 
	 */
	setupFiles: ['./webpack/config/jest/setup.js'],
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		路径别名 
	 */
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	/*
		文件名后缀缺省预置 
	 */
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	/* 
		模块目录
	 */
	moduleDirectories: ['node_modules', './src'],
	/*
		依赖缓存临时目录
			执行测试时需要读取的依赖的缓存目录
	 */
	cacheDirectory: `./.cache`,
	/*
		测试忽略文件 
	 */
	// testPathIgnorePatterns: ['./webpack/dist/', './node_modules/'],
	/* 
		watch 忽略目录
	 */
	watchPathIgnorePatterns: ['./webpack/dist/'],
	/* 
		测试对象扫描规则
	 */
	testRegex: 'tests/.*\\.test\\.js(x)$',
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		定义测试环境: node/jsdom 
	 */
	testEnvironment: 'jsdom',
	/*
		jsdom 测试环境测试地址, 反应在 location.herf 属性上 
	 */
	testURL: 'http://localhost',
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		定义转换器 
	 */
	transform: {
		'^.+\\.(js|jsx|mjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.(css|less)$': '<rootDir>/webpack/config/jest/cssTransform.js',
		'^(?!.*\\.(js|jsx|mjs|ts|tsx|css|json)$)': '<rootDir>/webpack/config/jest/fileTransform.js',
	},
	/*
		在转换时需要被忽略的文件目录 
	 */
	// transformIgnorePatterns: ['./node_modules/'],
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		设置是否收集覆盖率信息 
	 */
	collectCoverage: false,
	/*
		测试覆盖率输出目录 
	 */
	coverageDirectory: './coverage',
	/*
		测试覆盖率收集源(文件/目录) 
	 */
	collectCoverageFrom: ['./src/**/*.ts?(x)'],
	/* 
		指定哪种程序确定代码覆盖率
			'v8' || 'babel'
	 */
	coverageProvider: 'babel',
	/*
		测试覆盖率忽略目录 
			过滤无需统计的代码范围
	 */
	coveragePathIgnorePatterns: ['node_modules', 'test-config', 'interfaces', './src/types'],
	/*
		测试覆盖率报告规则
	 */
	coverageReporters: ['json-summary', 'text', 'lcov'],
	/*
		指定覆盖率目标
			- branches: 分支覆盖率 
			- functions: 函数执行的覆盖率 
			- lines: 代码函数覆盖率 
			- statements: 声明的覆盖率 
	 */
	coverageThreshold: {
		global: {
			statements: 90,
			branches: 90,
			functions: 90,
			lines: 90,
		},
	},
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		快照 
	 */
	snapshotSerializers: ['enzyme-to-json/serializer'],
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		测试标签(多项目时使用) 
	 */
	// displayName: `jest-test`,
	/*
		最大并发数 
	 */
	// maxConcurrency: 5,
	/*
		最大线程数 
	 */
	// maxWorkers: `50%`,
	/*
		测试结果通知 
	 */
	// notify: true,
	// notifyMode: `always`,
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		全局变量定义 
	 */
	globals: {
		__DEV__: true,
	},
}
