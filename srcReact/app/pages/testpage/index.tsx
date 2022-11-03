import React from 'react'
import { Helmet } from 'react-helmet-async'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import OverlayTestRoot from './overlayTest'
import ContexTesttRoot from './contextTest'
import HookRefRoot from './hookRef'
import { HookUseLayoutEffect } from './hookUseLayoutEffect'
import UseStoreRoot from './useStore'
import { TreeRoot } from './tree'

function TestPageRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`TestPageRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Test Page</title>
			</Helmet>
			<TreeRoot />
		</>
	)
}

export default React.memo(TestPageRoot)
