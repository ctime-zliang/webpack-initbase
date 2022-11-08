import React, { useEffect, useState } from 'react'
import ReactTree, { TTreeDataItem } from '../../../componnet/tree'
import { dataLine1, dataLine2, dataLine3 } from './data'

const clickAction = (a: any, b: any, c: any) => {
	console.log(a, b, c)
}
const expandAction = (a: any, b: any) => {
	console.log(a, b)
}

function TreeRoot(props: any): React.ReactElement {
	const [data2, setData2] = useState<Array<TTreeDataItem>>([])
	useEffect(() => {
		const el: HTMLElement = document.querySelector('.app-page-content') as HTMLElement
		if (el) {
			el.style.backgroundColor = '#ffffff'
		}
	}, [])
	useEffect(() => {
		window.setTimeout(() => {
			setData2(dataLine2 as Array<TTreeDataItem>)
		}, 2000)
	}, [])
	return (
		<section style={{ padding: `5px 5px` }}>
			<h2>Tree Case 01</h2>
			<div style={{ margin: '5px 0' }}>
				<ReactTree
					contentUnderline={false}
					multiSelect={true}
					showTagLine={true}
					showExpandBtn={true}
					onExpand={expandAction}
					onClick={clickAction}
					data={dataLine1}
				></ReactTree>
			</div>
			<h2>Tree Case 02</h2>
			<div style={{ margin: '5px 0' }}>
				<ReactTree
					selectedIds={['002']}
					contentUnderline={true}
					leftTranslationalAlignment={true}
					showExpandBtn={false}
					onExpand={expandAction}
					onClick={clickAction}
					data={data2}
				></ReactTree>
			</div>
			<h2>Tree Case 03</h2>
			<div style={{ margin: '5px 0' }}>
				<ReactTree
					selectedIds={[]}
					contentUnderline={true}
					expandAll={true}
					onExpand={expandAction}
					onClick={clickAction}
					data={dataLine3}
				></ReactTree>
			</div>
		</section>
	)
}

export default TreeRoot
