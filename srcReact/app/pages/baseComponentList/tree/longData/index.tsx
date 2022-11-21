import React, { useEffect, useState } from 'react'
import ReactTree, { TTreeDataItem } from '../../../../componnet/tree'
import { createLongData } from './data'

const clickAction = (a: any, b: any, c: any) => {
	console.log(a, b, c)
}
const expandAction = (a: any, b: any) => {
	console.log(a, b)
}

const dataLine = createLongData()

function TreeNormal(props: any): React.ReactElement {
	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 大数据展示</h3>
			<div style={{ height: '150px', overflow: 'auto' }}>
				<ReactTree
					contentUnderline={false}
					multiSelect={false}
					showTagLine={true}
					showExpandBtn={true}
					leftTranslationalAlignment={true}
					onExpand={expandAction}
					onClick={clickAction}
					data={dataLine}
				></ReactTree>
			</div>
		</section>
	)
}

export default TreeNormal
