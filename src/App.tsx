import React from 'react'
import UserForm from '@/public/userForm'
import '../node_modules/antd/dist/antd.css'

export default function App() {
	return (
		<section>
			<div className="wel-wrapper">Hello World</div>
			<div style={{ maxWidth: '960px' }}>
				<UserForm />
			</div>
		</section>
	)
}
