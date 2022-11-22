import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import VSItemFixedScrolling from './itemFixedHeight'
import VSItemNotFixedScrolling from './itemNotFixedHeight'

function VirtualScrollingRoot(props: any): React.ReactElement {
	console.log(`VirtualScrolling ☆☆☆`, props)
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Virtual Scrolling Component</title>
			</Helmet>
			<VSItemFixedScrolling />
			<VSItemNotFixedScrolling />
		</>
	)
}

export default React.memo(VirtualScrollingRoot)
