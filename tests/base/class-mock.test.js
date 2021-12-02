import ColorTool from '../../src/utils/Color.Tool'

jest.mock('../../src/utils/Color.Tool')

describe(`Class Mock Demo`, () => {
	/* 
		此条测试仅在未使用 jest mock 时执行
	 */
	// test(`单元测试: 测试类方法调用结果`, () => {
	// 	const hexString = `#ff6600`
	// 	const colorTool = new ColorTool()
	// 	expect(colorTool.setHex2RGBA(hexString)).toContain(`rgba`)
	// 	/*
	// 		在未使用 jest.mock 该类的情况下, 无法使用 jest 内置的函数调用记录判定接口来完成测试
	// 	 */
	// 	// expect(colorTool.setHex2RGBA).toHaveBeenCalled()
	// })
	test(`单元测试: 测试类(模拟)方法调用记录`, () => {
		const hexString = `#ff6600`
		const colorTool = new ColorTool()
		colorTool.setHex2RGBA(hexString)
		expect(colorTool.setHex2RGBA).toHaveBeenCalled()
	})
})
