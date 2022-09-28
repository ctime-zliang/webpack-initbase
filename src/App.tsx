import React from 'react'
import UserForm from '@/public/Component/UserForm/UserForm'
import '../node_modules/antd/dist/antd.css'
import Overlay from '@/public/Hoc/Overlay/Overlay'
import ValtioRoot from '@/modules/valtioTest'

export default function App(props: any): React.ReactElement {
	const { name } = props
	return (
		<section data-tagitem="React-App" className="react-app">
			<div className="wel-wrapper">Hello World {name || '--'}, React App</div>
			<UserForm />
			<ValtioRoot />
			<Overlay>
				<div>Overlay Component Call In App</div>
			</Overlay>
		</section>
	)
}
