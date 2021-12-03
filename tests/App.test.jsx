import React from 'react'
import { render as testingReactRender, screen } from '@testing-library/react'
import { render as enzymeRender, shallow } from 'enzyme'
import enzymeToJson from 'enzyme-to-json'
import App from '../src/App'

function add(a, b) {
	return a + b
}

describe(`React App Test`, () => {
	it(`React DOM 操作`, () => {
		const num = add(1, 2)
		const wrapper = shallow(<App name={num} />)
		expect(wrapper.find('div').length).toBe(2)
	})
})
