import ColorTool from '../../src/utils/Color.Tool'

describe(`ColorTool Test`, () => {
	it(`测试类方法: setHex2RGBA`, () => {
		const colorTool = new ColorTool()
		expect(colorTool.setHex2RGBA(`#ffffff`)).toBe(`rgba(255, 255, 255, 1)`)
	})
})
