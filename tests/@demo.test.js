/*
    当前文件中所有测试执行前触发, 只执行一次
 */
// beforeAll(() => {
// 	console.log('@demo.test - beforeAll')
// })
/*
    当前文件中每个测试执行前都会触发
 */
// beforeEach(() => {
// 	console.log('@demo.test - beforeEach')
// })
/*
    当前文件中每个测试结束后都会触发
 */
// afterEach(() => {
// 	console.log('@demo.test - afterEach')
// })
/*
    当前文件中所有测试执行结束后触发, 只执行一次
 */
// afterAll(() => {
// 	console.log('@demo.test - afterAll')
// })

describe(`JavaScript Test Demo`, () => {
	test(`Match Snapshot Demo`, () => {
		const user = {
			id: '234',
			name: 'LeBron James',
		}
		expect(user).toMatchSnapshot()
	})
})
