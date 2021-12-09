const utils = require('./config/utils')

const base = () => {
	const profile = {
		rootDir: './',
		verbose: true,
		automock: false,
		clearMocks: false,
		// dependencyExtractor: {},
		errorOnDeprecated: true,
	}
	if (utils.puppeteerCustomOnly()) {
		profile.globalSetup = './config/puppeteer/setup.js';
		profile.globalTeardown = './config/puppeteer/teardown.js';
		profile.testEnvironment = './config/puppeteer/puppeteer-environment.js';
	} else if (utils.puppeteerOnly()) {
		/*
			使用 jest-puppteer 预设来初始化 jest puppeteer 环境及基础配置
		 */
		profile.preset = 'jest-puppeteer'
	} else {
		profile.setupFiles = ['./config/jest/setup/setup.js'];
		profile.testEnvironment = 'jsdom';
		profile.testURL = 'http://localhost';
	}
	return profile
}

const testRule = () => {
	const TEST_PATH_IGNORE_PATTERNS = [
		'webpack/dist',
		'node_modules',
		/* ... */
		'e2e',
		'tests/@reference',
	]
	let testPathIgnorePatterns = []
	let testRegex = undefined
	if (utils.puppeteerOnly() || utils.puppeteerCustomOnly()) {
		testPathIgnorePatterns = [TEST_PATH_IGNORE_PATTERNS[0], TEST_PATH_IGNORE_PATTERNS[1], 'tests']
		testRegex = './e2e/.*\\.(test|spec)\\.(js|jsx)?$'
	} else {
		testPathIgnorePatterns = [...TEST_PATH_IGNORE_PATTERNS]
		testRegex = './tests/.*\\.(test|spec)\\.(js|jsx)?$'
	}
	return {
		moduleNameMapper: {
			'^@/(.*)$': '<rootDir>/src/$1',
			'.*\\.(css|less|styl|scss|sass)$': '<rootDir>/config/jest/mocks/cssModule.js',
			'.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/jest/mocks/image.js',
		},
		moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
		moduleDirectories: ['node_modules', './src'],
		cacheDirectory: `./.cache`,
		watchPathIgnorePatterns: ['webpack/dist'],
		testPathIgnorePatterns,
		testRegex,
	}
}

const transofrm = () => {
	return {
		transform: {
			'^.+\\.(js|jsx|mjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
			'^.+\\.(css|less)$': '<rootDir>/config/jest/setup/cssTransform.js',
			'^(?!.*\\.(js|jsx|mjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/setup/fileTransform.js',
		},
	}
}

const coverage = () => {
	if (utils.puppeteerOnly() || utils.puppeteerCustomOnly()) {
		return {
			collectCoverage: false,
		}
	}
	return {
		coverageDirectory: './coverage',
		coverageProvider: 'babel',
		collectCoverageFrom: ['src/**/*.{js,jsx,mjs,ts,tsx}'],
		coveragePathIgnorePatterns: [
			'node_modules',
			'config',
			'src/types',
			/* ... */
			'webpack/',
			/* ... */
			'src/modules',
			'src/public',
			'src/entry-mains.tsx',
		],
		coverageReporters: ['json-summary', 'text', 'lcov'],
		coverageThreshold: {
			global: {
				statements: 90,
				branches: 90,
				functions: 90,
				lines: 90,
			},
		},
	}
}

const snapshot = () => {
	return {
		snapshotSerializers: ['enzyme-to-json/serializer'],
	}
}

const extend = () => {
	return {
		globals: {
			__DEV__: true,
		},
	}
}

module.exports = () => {
	return {
		...base(),
		...testRule(),
		...transofrm(),
		...coverage(),
		...snapshot(),
		...extend(),
	}
}
