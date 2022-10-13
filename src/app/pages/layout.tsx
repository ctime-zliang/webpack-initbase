import React from 'react'
import PageHeader from '@/app/modules/layout/pageHeader'
import PageFooter from '@/app/modules/layout/pageFooter'
import PageContent from '@/app/modules/layout/pageContent'
import { TCommonComponentBaseProps } from '../types/comm.types'

function Layout(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Layout ☆☆☆`, props)
	return (
		<>
			<PageHeader {...props}></PageHeader>
			<PageContent {...props}>{props.children}</PageContent>
			<PageFooter {...props}></PageFooter>
		</>
	)
}

export default React.memo(Layout)
