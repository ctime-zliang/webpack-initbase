import { powerValue } from '../src/utils/math'

describe(`Math Calc Test`, () => {
	it(`2 ** 3 === 8`, () => {
		expect(powerValue(2, 3)).toBe(8)
	})
})
