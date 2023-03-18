import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../../app/utils/hooks/useContentBgColor'
import PresetManagerNoraml from './normal'

function PresetManagerRoot(props: any): React.ReactElement {
	console.log(`PresetManagerRoot ☆☆☆`, props)
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Contextmenu Component</title>
			</Helmet>
			<PresetManagerNoraml />
		</>
	)
}

export default React.memo(PresetManagerRoot)
