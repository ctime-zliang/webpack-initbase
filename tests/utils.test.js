import { powerValue } from '../src/utils/math'

describe(`Utils Functions Test`, () => {
	test('2 ** 3 = 8', () => {
		expect(powerValue(2, 3)).toBe(8)
	})
})
