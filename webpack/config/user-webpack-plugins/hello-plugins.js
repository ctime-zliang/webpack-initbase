const DEFAULT_OPTIONS = {}

const createFileListContent = fileList => {
	let string = `All ${fileList.length} files:\n`
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

	compiler.hooks.emit.tap('make', compilation => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tap @make`)
		console.log(Object.keys(compilation.assets))
	})
	compiler.hooks.emit.tap('done', compilation => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tap @done`)
		console.log(Object.keys(compilation.assets))
	})
	compiler.hooks.emit.tap('run', compilation => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tap @run`)
		console.log(Object.keys(compilation.assets))
	})
	compiler.hooks.emit.tapAsync('emit', (compilation, callback) => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tapAsync @emit`)
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
}

module.exports = HelloPlugin
