import axios from 'axios'
import { requestByGet } from '../../src/utils/request'

jest.mock('axios')

const runCallback = callback => {
	callback()
}
const runCallbackReturn = callback => {
	return callback()
}

describe(`Func Mock Test Demo`, () => {
	test(`返回指定值的函数调用`, () => {
		const fn = () => {
			return `This Value`
		}
		expect(runCallbackReturn(fn)).toBe(`This Value`)
	})
	/*
        toBeCalled 的测试依据即 jest.fn() 返回的函数对象中 calls 数组的长度, toBeCalled 具有特意性
     */
	test(`toBeCalled 测试内置 jest.fn`, () => {
		const fn = jest.fn()
		runCallback(fn)
		expect(fn).toBeCalled()
		// console.log(fn.mock)
		/*
		    测试: 函数调用次数
		 */
		// expect(func.mock.calls.length).toBe(2)
	})
	/*
        使用 mockImplementation 来模拟返回值 
     */
	test(`jest.fn().mockImplementationOnce 同步接口返回`, () => {
		const fn = jest.fn()
		fn.mockImplementationOnce(() => {
			return 'First Result'
		})
		fn.mockImplementationOnce(() => {
			return 'Second Result'
		})
		runCallback(fn)
		runCallback(fn)
		expect(fn).toBeCalled()
		// console.log(fn.mock)
	})
	// test(`Jest Mock Axios`, async () => {
	// 	axios.get.mockResolvedValue({ textContent: 'hello' })
	// 	const res = await requestByGet(``)
	// 	expect(res.data.textContent).toBe('hello')
	// })
})
