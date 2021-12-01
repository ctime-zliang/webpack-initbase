import { sleep } from '../src/utils/utils'

beforeEach(() => {
	jest.useFakeTimers()
})

describe(`Async Timer Test`, () => {
	/* 
        done 执行后, 测试结束
     */
	// test('等待异步函数', (done) => {
	//     sleep(2000, `timer`).then((res) => {
	//         expect(res).toEqual([`timer`])
	//         done()
	//     })
	// })
	/* 
        jest.runAllTimers(), 立即执行所有定时器
     */
	test('jest.runAllTimers 执行定时器', done => {
		sleep(2000, `timer`).then(res => {
			expect(res).toEqual([`timer`])
			done()
		})
		jest.runAllTimers()
	})
	/* 
        jest.runOnlyPendingTimers(), 立即执行当前处于 pending 状态的定时器
            适用于嵌套使用例如 setTimeout 时的情况
     */
	test('jest.runOnlyPendingTimers 执行定时器', done => {
		sleep(2000, `timer`).then(res => {
			expect(res).toEqual([`timer`])
			done()
		})
		jest.runOnlyPendingTimers()
	})
	/* 
        待验证
        jest.advanceTimersByTime(), 将时间线往前"跳跃"指定时间长度
            如
                设置 setTimeout(cb, 2000)
            并
                使用 jest.advanceTimersByTime(1000)
            则
                只需等待 1000ms 即可执行 cb
     */
	// test('jest.advanceTimersByTime 执行定时器', (done) => {
	//     sleep(5000, `timer`).then((res) => {
	//         expect(res).toEqual([`timer`])
	//         done()
	//     })
	//     jest.advanceTimersByTime(4000)
	// })
})
