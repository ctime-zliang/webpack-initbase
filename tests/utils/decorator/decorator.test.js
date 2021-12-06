import decoratorMain from '../../../src/utils/decorator/decorator'

describe(`Decorator Test`, () => {
	it(`默认导出测试`, () => {
		const data = decoratorMain()
		expect(data).toBe(true)
	})
})
