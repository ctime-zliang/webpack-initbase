import React from 'react'
import UserForm from '@/public/Component/UserForm/UserForm'
import '../node_modules/antd/dist/antd.css'
import Overlay from '@/public/Hoc/Overlay/Overlay'
import ValtioRoot from '@/modules/valtioTest'
import ReduxRoot from './modules/reudxTest'

export default function App(props: any): React.ReactElement {
	const { name } = props
	return (
		<section data-tagitem="React-App" className="react-app">
			<h1 className="wel-wrapper">Hello World {name || '--'}, React App</h1>
			<UserForm />
			<ValtioRoot />
			<ReduxRoot />
			<Overlay>
				<div>Overlay Component Call In App</div>
			</Overlay>
		</section>
	)
}
