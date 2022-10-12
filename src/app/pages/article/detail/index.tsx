import React from 'react'
import { Helmet } from 'react-helmet-async'

function DetailRoot(props: any): React.ReactElement {
	console.log(`DetailRoot ☆☆☆`, props)
	const { list } = props
	return (
		<>
			<Helmet>
				<title>Article Detail List</title>
			</Helmet>
			<section>Article Detail List</section>
		</>
	)
}

export default React.memo(DetailRoot)
