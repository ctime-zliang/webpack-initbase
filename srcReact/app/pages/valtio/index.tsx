import React from 'react'
import { Helmet } from 'react-helmet-async'
import ValtioTestRoot from '../../modules/valtioTest'
import { TCommonComponentBaseProps } from '../../types/comm.types'

function ValtioContainerRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`ValtioContainerRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Valtio State Manager</title>
			</Helmet>
			<ValtioTestRoot {...props} />
		</>
	)
}

export default React.memo(ValtioContainerRoot)
