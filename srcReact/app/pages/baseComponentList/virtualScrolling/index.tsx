import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import VariableHeightListScrollingRoot from './variableHeightListScrolling'
import FixedHeightListScrollingRoot from './fixedHeightListScrolling'

function VirtualScrollingRoot(props: any): React.ReactElement {
	console.log(`VirtualScrolling ☆☆☆`, props)
	useContentBgColor('rgba(230, 230, 230, 1)')
	return (
		<>
			<Helmet>
				<title>Virtual Scrolling Component</title>
			</Helmet>
			<VariableHeightListScrollingRoot />
			<FixedHeightListScrollingRoot />
		</>
	)
}

export default React.memo(VirtualScrollingRoot)
