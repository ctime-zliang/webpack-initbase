import React from 'react'
import UserForm from '@/public/userForm'
/* fix: 
	esbuild-loader 
	maybe import antd.css in this
*/
import '../node_modules/antd/dist/antd.css'

export default function App() {
	return (
		<section>
			<div>Hello World</div>
			<div style={{ maxWidth: '960px' }}>
				<UserForm />
			</div>
		</section>
	)
}
