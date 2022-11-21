import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../../app/utils/hooks/useContentBgColor'
import TreeNormal from './normal'
import TreeAyncSetData from './asyncSetData'
import TreeAutoExpandAllLevel from './autoExpandAllLevel'
import LongData from './longData'

function TreeRoot(props: any): React.ReactElement {
	console.log(`TreeRoot ☆☆☆`, props)
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Tree Component</title>
			</Helmet>
			<TreeNormal />
			<TreeAyncSetData />
			<TreeAutoExpandAllLevel />
			<LongData />
		</>
	)
}

export default React.memo(TreeRoot)
