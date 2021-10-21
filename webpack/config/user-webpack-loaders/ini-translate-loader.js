const loaderUtils = require('loader-utils')
const utils = require('../../../config/utils')

module.exports = function (content, map, meta) {
	const eContent = utils.getStringExportContent(content)
	if (!eContent) {
		return utils.createLoaderResult(JSON.stringify({}))
	}
	try {
		const data = JSON.parse(eContent)
		data['__translate'] = true
		return utils.createLoaderResult(JSON.stringify(data))
	} catch (e) {
		console.log(e)
		return utils.createLoaderResult(JSON.stringify({}))
	}
}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
	return undefined
}
