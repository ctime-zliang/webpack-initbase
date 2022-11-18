import React from 'react'
import { Helmet } from 'react-helmet-async'
import ReduxTestRoot from '../../modules/reduxTest'
import { TCommonComponentBaseProps } from '../../types/comm.types'

function ReduxContainerRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`ReduxContainerRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Redux State Manager</title>
			</Helmet>
			<ReduxTestRoot {...props} />
		</>
	)
}

export default React.memo(ReduxContainerRoot)
