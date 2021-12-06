import { requestByGet } from '../../src/utils/request'

describe(`Request Test`, () => {
	it(`requestByGet 请求测试: 成功`, async () => {
		const res = await requestByGet(`http://www.dell-lee.com/react/api/demo.json`)
		expect(res.data).toEqual({ success: true })
	})
	it(`requestByGet 请求测试: 失败`, async () => {
		const res = await requestByGet(`http://www.dell-lee.com/react/api/demo.jsonsss`)
		expect(res.data).toEqual(null)
	})
})
