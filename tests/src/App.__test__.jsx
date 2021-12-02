import React from 'react'
import { render as testingReactRender, screen } from '@testing-library/react'
import { render as enzymeRender, shallow } from 'enzyme'
import enzymeToJson from 'enzyme-to-json'
import App from '../../src/App'

describe(`React Test Demo`, () => {
	it(`React DOM 操作`, () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(`div`).hasClass(`wel-wrapper`)).toBeTruthy()
	})
})
