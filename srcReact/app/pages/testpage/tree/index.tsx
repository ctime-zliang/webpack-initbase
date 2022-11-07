import React, { useEffect } from 'react'
import ReactTree from '../../../componnet/tree'

const dataLine1: any = [
	{
		title: '001',
		id: '001',
		children: [
			{
				title: '0011',
				id: '0011',
				children: [
					{
						title: '00111',
						id: '00111',
						children: [
							{
								title: '001111',
								id: '001111',
								children: [
									{
										title: '0011111',
										id: '0011111',
									},
								],
							},
						],
					},
				],
			},
			{
				title: '0012',
				id: '0012',
			},
			{
				title: '0013',
				id: '0013',
				children: [
					{
						title: '00131',
						id: '00131',
					},
				],
			},
		],
	},
]

const dataLine2: any = [
	{
		title: '001',
		id: '001',
	},
	{
		title: '002',
		id: '002',
	},
	{
		title: '003',
		id: '003',
	},
]

const clickAction = (a: any, b: any, c: any) => {
	console.log(a, b, c)
}
const expandAction = (a: any, b: any) => {
	console.log(a, b)
}

function TreeRoot(props: any): React.ReactElement {
	useEffect(() => {
		const el: HTMLElement = document.querySelector('.app-page-content') as HTMLElement
		if (el) {
			el.style.backgroundColor = '#ffffff'
		}
	}, [])
	return (
		<section style={{ padding: `5px 5px` }}>
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
			<br />
			<div style={{ margin: '5px 0' }}>
				<ReactTree
					selectedIds={['002']}
					contentUnderline={true}
					leftTranslationalAlignment={true}
					showExpandBtn={false}
					onExpand={expandAction}
					onClick={clickAction}
					data={dataLine2}
				></ReactTree>
			</div>
		</section>
	)
}

export default TreeRoot
