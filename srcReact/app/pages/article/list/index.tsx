import React from 'react'
import { Helmet } from 'react-helmet-async'

function ListRoot(props: any): React.ReactElement {
	console.log(`ListRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Article List</title>
			</Helmet>
			<section>Article List</section>
		</>
	)
}

export default React.memo(ListRoot)
