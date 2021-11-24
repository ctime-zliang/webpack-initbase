/*
	enzyme 渲染方式
		- shallow: 前渲染, 生成 vDom, 不渲染子组件, 只能对当前组件做断言
		- render: 静态渲染, 生成 html 字符串, 适用 Cheerio 分析字符串并返回 Cheerio 对象
		- mount: 完全渲染, 将组建渲染成真实完整的 DOM, 可测试 DOM API 和组建声明周期, 由 jsdom 提供模拟浏览器环境支持
 */

import React from 'react'
import { render as testingReactRender, screen } from '@testing-library/react'
import { render as enzymeRender } from 'enzyme'

const Main = () => {
	return (
		<>
			<div className="demo-jest-test">Demo Jest Test</div>
		</>
	)
}

describe(`React Demo Test 1`, () => {
	test('DOM Operation', () => {
		testingReactRender(<Main />)
		// screen.debug()
		const element = document.querySelector(`.demo-jest-test`)
		expect(element).toBeTruthy()
		expect(element.textContent).toBe(`Demo Jest Test`)
	})
})

describe(`React Demo Test 2`, () => {
	test('DOM Operation', () => {
		enzymeRender(<Main />)
		// screen.debug()
		const element = document.querySelector(`.demo-jest-test`)
		expect(element).toBeTruthy()
		expect(element.textContent).toBe(`Demo Jest Test`)
	})
})
