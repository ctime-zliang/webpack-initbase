const runCallback1 = (callback) => {
    callback()
}
const runCallback2 = (callback) => {
    return callback()
}

describe(`Func Mock Test Demo`, () => {
	test(`返回指定值的函数调用`, () => {
		const fn = () => { return `This Value` }
        expect(runCallback2(fn)).toBe(`This Value`)
	})
    /*
        toBeCalled 的测试依据即 jest.fn() 返回的函数对象中 calls 数组的长度, toBeCalled 具有特意性
     */
    test(`toBeCalled 测试内置 jest.fn`, () => {
		const fn = jest.fn()
        runCallback1(fn)
        expect(fn).toBeCalled()
        // console.log(fn.mock)
	})
})