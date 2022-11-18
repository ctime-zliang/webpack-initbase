import React from 'react'
import { Helmet } from 'react-helmet-async'
import TreeNormal from './normal'

function TreeRoot(props: any): React.ReactElement {
	console.log(`TreeRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Tree Component</title>
			</Helmet>
			<TreeNormal />
		</>
	)
}

export default React.memo(TreeRoot)
