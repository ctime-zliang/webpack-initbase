import React from 'react'
import { Helmet } from 'react-helmet-async'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import OverlayTestRoot from './overlayTest'
import ContexTesttRoot from './contextTest'
import HookRefRoot from './hookRef'
import { HookUseLayoutEffect } from './hookUseLayoutEffect'
import UseDervStoreRoot from './useDervStore'
import TreeRoot from './tree'
//@ts-ignore
import Pagination from './__paginaTest'

function TestPageRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`TestPageRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Test Page</title>
			</Helmet>
			<section>
				<Pagination pageNum={20} middleDisplayRange={5} sideDislpayRange={2} />
			</section>
		</>
	)
}

export default React.memo(TestPageRoot)
