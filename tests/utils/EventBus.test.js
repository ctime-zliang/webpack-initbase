import EventBus from '../../src/utils/EventBus'

describe(`EventBus Test`, () => {
	it(`同步测试: on & emit - 参数正常`, done => {
		EventBus.on(`testSyncEvent`, () => {
			done()
		})
		EventBus.emit(`testSyncEvent`)
	})
	/* ... */
	it(`异步等待测试: subscribe & exec`, async () => {
		EventBus.subscribe(`testAsyncEvent`, async () => {
			return 1
		})
		const res = await EventBus.exec(`testAsyncEvent`)
		expect(res.data).toBe(1)
	})
})
