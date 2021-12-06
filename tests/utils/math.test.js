import { powerValue } from '../../src/utils/math'

describe(`Math Test`, () => {
	it(`计算表达式: 2 ** 3 === 8`, () => {
		expect(powerValue(2, 3)).toBe(8)
	})
})
