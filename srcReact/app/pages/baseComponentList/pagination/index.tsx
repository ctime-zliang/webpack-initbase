import React from 'react'
import { Helmet } from 'react-helmet-async'
import PaginationNoraml from './normal'

function PaginationRoot(props: any): React.ReactElement {
	console.log(`PaginationRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Pagination Component</title>
			</Helmet>
			<section style={{ padding: '10px 10px' }}>
				<PaginationNoraml />
			</section>
		</>
	)
}

export default React.memo(PaginationRoot)
