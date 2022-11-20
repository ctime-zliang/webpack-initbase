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
			<section style={{ padding: '10px 10px' }}>
				<h3>$. 完整模式</h3>
				<PaginationNoraml />
			</section>
			<section style={{ padding: '10px 10px' }}>
				<h3>$. 精简模式</h3>
				<PaginationSimplify />
			</section>
		</>
	)
}

export default React.memo(PaginationRoot)
