const DEFAULT_OPTIONS = {}

function HelloPlugin(options) {
	this.options = { ...DEFAULT_OPTIONS, options }
}

HelloPlugin.prototype.apply = function (compiler) {
	console.log(compiler)
	compiler.hooks.emit.tap('HelloPlugin', compilation => {
		// console.log(compilation)
	})
}

module.exports = HelloPlugin
