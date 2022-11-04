import React from 'react'
import { Helmet } from 'react-helmet-async'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import OverlayTestRoot from './overlayTest'
import ContexTesttRoot from './contextTest'
import HookRefRoot from './hookRef'
import { HookUseLayoutEffect } from './hookUseLayoutEffect'
import UseStoreRoot from './useStore'
/* ... */
import ReactTree from '../../componnet/tree'

const dataLine: any = [
	{
		title: '001',
		children: [
			{
				title: '0011',
				children: [
					{
						title: '00111',
						children: [
							{
								title: '001111',
							},
						],
					},
				],
			},
			{
				title: '0012',
			},
			{
				title: '0013',
				children: [
					{
						title: '00131',
					},
				],
			},
		],
	},
]

const clickAction = (a: any, b: any) => {
	console.log(a, b)
}
const expandAction = (a: any, b: any) => {
	console.log(a, b)
}

function TestPageRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`TestPageRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Test Page</title>
			</Helmet>
			<ReactTree onExpand={expandAction} onClick={clickAction} data={dataLine}></ReactTree>
		</>
	)
}

export default React.memo(TestPageRoot)
