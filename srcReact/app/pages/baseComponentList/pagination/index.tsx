import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../../app/utils/hooks/useContentBgColor'
import PaginationNoraml from './normal'
import PaginationSimplify from './simplify'

function PaginationRoot(props: any): React.ReactElement {
	console.log(`PaginationRoot ☆☆☆`, props)
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Pagination Component</title>
			</Helmet>
			<PaginationNoraml />
			<PaginationSimplify />
		</>
	)
}

export default React.memo(PaginationRoot)
