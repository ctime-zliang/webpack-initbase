/*
	enzyme 渲染方式
		- shallow: 前渲染, 生成 vDom, 不渲染子组件, 只能对当前组件做断言
		- render: 静态渲染, 生成 html 字符串, 适用 Cheerio 分析字符串并返回 Cheerio 对象
		- mount: 完全渲染, 将组建渲染成真实完整的 DOM, 可测试 DOM API 和组建声明周期, 由 jsdom 提供模拟浏览器环境支持
 */

import React from 'react'
import { render as testingReactRender, screen } from '@testing-library/react'
import { render as enzymeRender, shallow } from 'enzyme'
import enzymeToJson from 'enzyme-to-json'

const Button = () => {
	return (
		<>
			<button className="btn">Button</button>
		</>
	)
}

const HelloComponent = () => {
	return (
		<>
			<div>
				Hello, React Component <Button />
			</div>
		</>
	)
}

/********************************************* *********************************************/
/********************************************* *********************************************/
/********************************************* *********************************************/

describe(`React Test Demo`, () => {
	test(`React 快照测试`, () => {
		const wrapper = shallow(<HelloComponent />)
		expect(enzymeToJson(wrapper)).toMatchSnapshot()
	})
	test(`React DOM 操作`, () => {
		const wrapper = shallow(<Button />)
		expect(wrapper.find(`button`).hasClass(`btn`)).toBeTruthy()
	})
})
