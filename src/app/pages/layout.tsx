import React from 'react'
import PageHeader from '@/app/modules/Public/PageHeader'
import PageFooter from '@/app/modules/Public/PageFooter'
import PageContent from '@/app/modules/Public/PageContent'
import { TCommonComponentBaseProps } from '../types/comm.types'

function Layout(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Layout ☆☆☆`, props)
	const meta: { [key: string]: any } = props.meta || {}
	return (
		<>
			<PageHeader {...props}></PageHeader>
			<PageContent {...props}>{props.children}</PageContent>
			<PageFooter {...props}></PageFooter>
		</>
	)
}

export default React.memo(Layout)
