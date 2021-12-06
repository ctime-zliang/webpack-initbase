import React from 'react'
import { render as testingReactRender, screen } from '@testing-library/react'
import { render as enzymeRender, shallow } from 'enzyme'
import enzymeToJson from 'enzyme-to-json'
import App from '../src/App'

describe(`React App Test`, () => {
	it(`React DOM`, () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find('div').length).toBe(2)
	})
})
