import { requestByGet } from '../src/utils/request'

describe(`Async Request Test`, () => {
	/* 
        仅会测试目标函数是否成功执行, 同步执行无错误即测试完成, 不会等待异步结束
     */
	test('同步执行异步函数', () => {
		requestByGet(`http://www.dell-lee.com/react/api/demo.json`).then(res => {
			expect(res.data).toEqual({ success: true })
		})
	})
	/*
        仅在 done 回调被调用执行时才判定测试已结束 
     */
	test('等待异步函数', done => {
		requestByGet(`http://www.dell-lee.com/react/api/demo.json`).then(res => {
			expect(res.data).toEqual({ success: true })
			done()
		})
	})
	/*
        直接返回一个 Promise 对象
        
            若
                只显式声明 then 或 catch 其中的一个
            则
                需设置 expect.assertions(1) 以保证该 Promise 在任何情况下都能通过测试
                expect.assertions(1) 即表示至少执行一条 expect
     */
	test('返回 Promise', () => {
		// expect.assertions(1)
		return requestByGet(`http://www.dell-lee.com/react/api/demo.jsons`)
			.then(res => {
				expect(res.data).toEqual({ success: true })
			})
			.catch(e => {
				expect(e.ret).not.toBe(0)
			})
	})
	/*
        使用 resolves 求值
     */
	test('使用 resolves 求值', () => {
		return expect(requestByGet(`http://www.dell-lee.com/react/api/demo.json`)).resolves.toMatchObject({
			data: {
				success: true,
			},
		})
		// return expect(requestByGet(`http://www.dell-lee.com/react/api/demo.json`)).rejects.toThrow()
	})
	/*
        使用 await
            Test functions cannot both take a 'done' callback and return something. Either use a 'done' callback, or return a promise.
     */
	test('使用 await', async () => {
		const res = await requestByGet(`http://www.dell-lee.com/react/api/demo.json`)
		expect(res.data).toEqual({ success: true })
	})
})
