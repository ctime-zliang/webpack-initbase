const ColorTool = jest.fn(function () {
	/* ... */
})
ColorTool.prototype.setHex2RGBA = jest.fn(function (hexString, opacity = 1) {
	console.log(`=======>>>>> ColorTool.setHex2RGBA`)
	return (
		'rgba(' +
		parseInt('0x' + hexString.slice(1, 3)) +
		', ' +
		parseInt('0x' + hexString.slice(3, 5)) +
		', ' +
		parseInt('0x' + hexString.slice(5, 7)) +
		', ' +
		opacity +
		')'
	)
})

export default ColorTool
