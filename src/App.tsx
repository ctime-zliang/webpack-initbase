import React from 'react'
import UserForm from '@/public/userForm'
import '../node_modules/antd/dist/antd.css'
import Counter from '@/modules/counter'

export default function App(props: any) {
	const { name } = props
	return (
		<section className="React-App">
			<div className="wel-wrapper">Hello World {name}</div>
			<div>
				<UserForm />
			</div>
			<Counter />
		</section>
	)
}
