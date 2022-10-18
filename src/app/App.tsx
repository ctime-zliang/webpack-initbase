import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import '../../node_modules/antd/dist/antd.css'
import Root from '@/app/pages/root'
import favicon from '@/app/assets/images/log.jpg'
import { TCommonComponentBaseProps } from './types/comm.types'

export default function App(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`App ☆☆☆`, props)
	const __app_id__: number = Math.random()
	return (
		<section data-tagitem="React-App-Section" className="react-app-section">
			<Helmet link={[{ rel: 'icon', type: 'image/jpg', href: favicon }]}>
				<title>React Application</title>
			</Helmet>
			<Root __AppProps__={{ __app_id__ }} {...props} />
		</section>
	)
}
