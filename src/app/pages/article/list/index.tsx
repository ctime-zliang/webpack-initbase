import React from 'react'
import { Helmet } from 'react-helmet-async'

function ListRoot(props: any): React.ReactElement {
	console.log(`ListRoot ☆☆☆`, props)
	const { list } = props
	return (
		<>
			<Helmet>
				<title>Article Link List</title>
			</Helmet>
			<section>Article Link List</section>
		</>
	)
}

export default React.memo(ListRoot)
