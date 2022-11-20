import React, { useEffect, useState } from 'react'
import ReactTree, { TTreeDataItem } from '../../../../componnet/tree'
import { dataLine } from './data'

const clickAction = (a: any, b: any, c: any) => {
	console.log(a, b, c)
}
const expandAction = (a: any, b: any) => {
	console.log(a, b)
}

function TreeAutoExpandAllLevel(props: any): React.ReactElement {
	return (
		<section style={{ padding: `5px 5px` }}>
			<ReactTree
				selectedIds={[]}
				contentUnderline={true}
				expandAll={true}
				onExpand={expandAction}
				onClick={clickAction}
				data={dataLine}
			></ReactTree>
		</section>
	)
}

export default TreeAutoExpandAllLevel
