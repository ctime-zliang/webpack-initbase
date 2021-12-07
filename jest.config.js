const base = () => {
	const profile = {
		rootDir: './',
		verbose: true,
		automock: false,
		clearMocks: false,
		setupFiles: ['./config/jest/setup/setup.js'],
		preset: 'jest-puppeteer',
		// dependencyExtractor: {},
		errorOnDeprecated: true,
		testEnvironment: 'jsdom',
		testURL: 'http://localhost',
	}
	if (process.argv.includes('--puppeteer=true')) {
		delete profile.testEnvironment
		delete profile.setupFiles
	}
	return profile
}

const testRule = () => {
	const _testPathIgnorePatterns = ['webpack/dist', 'node_modules', 'puppeteer', 'tests/@reference']
	let testPathIgnorePatterns = []
	let testRegex = './tests/.*\\.(test|spec)\\.(js|jsx)?$'
	if (process.argv.includes('--puppeteer=true')) {
		testPathIgnorePatterns = [_testPathIgnorePatterns[0], _testPathIgnorePatterns[1], 'tests']
		testRegex = './e2e/.*\\.(test|spec)\\.(js|jsx)?$'
	} else {
		testPathIgnorePatterns = [..._testPathIgnorePatterns]
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
	if (process.argv.includes('--puppeteer=true')) {
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
