import { sleep } from '../../src/utils/utils'

describe(`Utils Test`, () => {
	it(`sleep 异步延迟测试`, async () => {
		const res = await sleep(500, 1)
		expect(res).toEqual([1])
	})
})
