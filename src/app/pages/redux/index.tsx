import React from 'react'
import { Helmet } from 'react-helmet-async'
import ReduxRoot from '@/app/modules/reduxTest'
import { TCommonComponentBaseProps } from '@/app/types/comm.types'

function ReduxContainerRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`ValtioContainerRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Redux State Manager</title>
			</Helmet>
			<ReduxRoot {...props} />
		</>
	)
}

export default React.memo(ReduxContainerRoot)
