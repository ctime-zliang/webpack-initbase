const rimraf = require('rimraf')
const utils = require('../../../config/utils')

const DEFAULT_OPTIONS = {}

const createFileListContent = fileList => {
	let string = `[${new Date().getTime()}]All ${fileList.length} files:\n`
	fileList.forEach(item => {
		string += `${item}\n`
	})
	return {
		filecontent: string,
		filename: `file-list.txt`,
	}
}

function HelloPlugin(options) {
	this.options = { ...DEFAULT_OPTIONS, options }
}

HelloPlugin.prototype.apply = function (compiler) {
	// console.log(compiler)
	console.log(`HelloPlugin: apply call`)

	compiler.hooks.emit.tap('run', compilation => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tap @run`)
		console.log(Object.keys(compilation.assets))
	})

	compiler.hooks.emit.tap('compile', compilation => {
		console.log('\n')
		rimraf.sync(utils.resolveDirectory('./webpack/dist/dev-build'))
		console.log(`HelloPlugin: compiler.hooks.emit.tap @compile: starting to compile`)
		console.log(Object.keys(compilation.assets))
	})
	compiler.hooks.emit.tap('compilation', compilation => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tap @compilation: starting a new compilation`)
		console.log(Object.keys(compilation.assets))
	})
	compiler.hooks.emit.tap('make', compilation => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tap @make: making file`)
		console.log(Object.keys(compilation.assets))
	})
	compiler.hooks.emit.tap('after-compile', compilation => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tap @after-compile: aleardy compiled`)
		console.log(Object.keys(compilation.assets))
	})
	compiler.hooks.emit.tap('done', compilation => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tap @done`)
		console.log(Object.keys(compilation.assets))
	})
	compiler.hooks.emit.tapAsync('emit', (compilation, callback) => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tapAsync @emit: going to emit files`)
		const fileListRes = createFileListContent(Object.keys(compilation.assets))
		compilation.assets[fileListRes.filename] = {
			source() {
				return fileListRes.filecontent
			},
			size() {
				return Buffer.byteLength(fileListRes.filecontent, 'utf8')
			},
		}
		console.log(Object.keys(compilation.assets))
		callback()
	})
	compiler.hooks.emit.tap('after-emit', compilation => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tap @after-emit: aleardy emitted`)
		console.log(Object.keys(compilation.assets))
	})
}

module.exports = HelloPlugin
