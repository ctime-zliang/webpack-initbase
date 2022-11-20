import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../../app/utils/hooks/useContentBgColor'
import TreeNormal from './normal'
import TreeAyncSetData from './asyncSetData'
import TreeAutoExpandAllLevel from './autoExpandAllLevel'

function TreeRoot(props: any): React.ReactElement {
	console.log(`TreeRoot ☆☆☆`, props)
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Tree Component</title>
			</Helmet>
			<section style={{ padding: '10px 10px' }}>
				<h3>$. 常规模式</h3>
				<TreeNormal />
			</section>
			<section style={{ padding: '10px 10px' }}>
				<h3>$. 异步设置数据</h3>
				<TreeAyncSetData />
			</section>
			<section style={{ padding: '10px 10px' }}>
				<h3>$. 初始化时展开所有层级</h3>
				<TreeAutoExpandAllLevel />
			</section>
		</>
	)
}

export default React.memo(TreeRoot)
