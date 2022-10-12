import React from 'react'
import { Helmet } from 'react-helmet-async'
import ValtioRoot from '@/app/modules/valtioTest'
import { TCommonComponentBaseProps } from '@/app/types/comm.types'

function ValtioContainerRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`ValtioContainerRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Valtio State Manager</title>
			</Helmet>
			<ValtioRoot {...props} />
		</>
	)
}

export default React.memo(ValtioContainerRoot)
