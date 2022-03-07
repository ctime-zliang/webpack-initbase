import React from 'react'
import UserForm from '@/public/userForm'
import '../node_modules/antd/dist/antd.css'
import Counter from '@/modules/counter'
import Overlay from '@/public/overlay'

export default function App(props: any) {
	const { name } = props
	return (
		<section data-tagitem="React-App" className="react-app">
			<div className="wel-wrapper">Hello World {name}</div>
			{/* <div>
				<UserForm />
			</div> */}
			<Counter />
			<Overlay>
				<div>Overlay Component Call In App</div>
			</Overlay>
		</section>
	)
}
