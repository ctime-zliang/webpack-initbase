import React, { useEffect, useState } from 'react'
import ReactTree, { TTreeDataItem } from '../../../../componnet/tree'
import { dataLine } from './data'

const clickAction = (a: any, b: any, c: any) => {
	console.log(a, b, c)
}
const expandAction = (a: any, b: any) => {
	console.log(a, b)
}

function TreeAyncSetData(props: any): React.ReactElement {
	const [data2, setData2] = useState<Array<TTreeDataItem>>([])
	useEffect(() => {
		window.setTimeout(() => {
			setData2(dataLine as Array<TTreeDataItem>)
		}, 2000)
	}, [])
	if (data2.length <= 0) {
		return <div>loading data...</div>
	}
	return (
		<section style={{ padding: `5px 5px` }}>
			<ReactTree
				selectedIds={['002']}
				contentUnderline={true}
				leftTranslationalAlignment={true}
				showExpandBtn={false}
				onExpand={expandAction}
				onClick={clickAction}
				data={data2}
			></ReactTree>
		</section>
	)
}

export default TreeAyncSetData
