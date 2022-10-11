import React from 'react'
import './index.less'

const appPageContentStyle: { [key: string]: string | number } = {
	height: `calc(100vh - 95px)`,
	minHeight: `calc(100vh - 95px)`,
	overflow: 'auto',
}

function PageContentRoot(props: any): React.ReactElement {
	return (
		<main className="app-page-content" style={appPageContentStyle}>
			{props.children}
		</main>
	)
}

export default React.memo(PageContentRoot)
