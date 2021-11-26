import { powerValue } from '../src/utils/math'

describe(`Utils Functions Test`, () => {
	test('2 ** 3 = 8', () => {
		expect(powerValue(2, 3)).toBe(8)
	})
	test('0.1 + 0.2 = 0.3', () => {
		expect( 0.1 + 0.2).toBeCloseTo(0.3)
	})
})
