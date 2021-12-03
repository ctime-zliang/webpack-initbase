import React from 'react'
import UserForm from '@/public/userForm'
import '../node_modules/antd/dist/antd.css'

export default function App(props: any) {
	const { name } = props
	return (
		<section>
			<div className="wel-wrapper">Hello World {name}</div>
			<div style={{ maxWidth: '960px' }}>
				<UserForm />
			</div>
		</section>
	)
}
