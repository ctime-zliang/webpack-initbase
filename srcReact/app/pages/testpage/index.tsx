import React from 'react'
import { Helmet } from 'react-helmet-async'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import OverlayTestRoot from './overlayTest'
import ContexTesttRoot from './contextTest'
import HookRefTestRoot from './hookRef'
import { HookUseLayoutEffect } from './hookUseLayoutEffect'
import UseDervStoreTestRoot from './useDervStore'
import InfiniteScrollRoot from './infiniteScrolling'

function TestPageRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`TestPageRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Test Page</title>
			</Helmet>
			<section>
				<UseDervStoreTestRoot />
			</section>
		</>
	)
}

export default React.memo(TestPageRoot)
