import React from 'react'
import PageHeader from '@/app/modules/Public/PageHeader'
import PageFooter from '@/app/modules/Public/PageFooter'
import PageContent from '@/app/modules/Public/PageContent'

function Layout(props: any): React.ReactElement {
	console.log(`Layout ☆☆☆`, props)
	const meta: { [key: string]: any } = props.meta || {}
	return (
		<>
			<PageHeader></PageHeader>
			<PageContent>{props.children}</PageContent>
			<PageFooter></PageFooter>
		</>
	)
}

export default React.memo(Layout)
