import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../../app/utils/hooks/useContentBgColor'
import ContextmenuNoraml from './normal'

function ContextmenuNoramlRoot(props: any): React.ReactElement {
	console.log(`ContextmenuNoramlRoot ☆☆☆`, props)
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Contextmenu Component</title>
			</Helmet>
			<ContextmenuNoraml />
		</>
	)
}

export default React.memo(ContextmenuNoramlRoot)
