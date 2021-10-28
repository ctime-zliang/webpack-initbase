const loaderUtils = require('loader-utils')
const utils = require('../../../config/utils')

const parseInit = async content => {
	return new Promise((_, reject) => {
		try {
			const result = {}
			if (!content || !content.trim()) {
				return JSON.stringify(result)
			}
			const tags = content.match(/\[(.*)\]/gi)
			for (let i = 0; i < tags.length - 1; i += 2) {
				const r = /\[(.*)\]/gi.exec(tags[i])
				if (!r || !r[1]) {
					continue
				}
				const expressions = content.substring(content.indexOf(tags[i]) + tags[i].length, content.indexOf(tags[i + 1])).split('\n')
				if (!result[r[1]]) {
					result[r[1]] = {}
				}
				for (let j = 0; j < expressions.length; j++) {
					if (expressions[j] && expressions[j].trim()) {
						const p = expressions[j].split('=')
						result[r[1]][p[0].trim().replace(/\r/, '')] = p[1].trim().replace(/\r/, '')
					}
				}
			}
			_(result)
		} catch (e) {
			reject(e)
		}
	})
}

module.exports = function (content, map, meta) {
	this.cacheable && this.cacheable()
	const callback = this.async()
	const loaderOptions = loaderUtils.getOptions(this)
	parseInit(utils.getStringExportContent(content))
		.then(data => {
			this.async()(null, utils.createLoaderResult(JSON.stringify(data)), map, meta)
		})
		.catch(e => {
			console.log(e)
			this.async()(null, utils.createLoaderResult(JSON.stringify({})), map, meta)
		})
	return utils.createLoaderResult(undefined)
}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
	return
}
