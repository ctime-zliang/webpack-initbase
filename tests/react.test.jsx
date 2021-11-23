import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe(`React App Test`, () => {
	test('DOM Operation', () => {
		render(<App />)
		// screen.debug()
		const element = document.querySelector(`section`)
		expect(element).toBeTruthy()
		expect(element.firstElementChild.textContent).toBe(`Hello World`)
	})
})
