import React from 'react'
import { Helmet } from 'react-helmet-async'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import OverlayTestRoot from './overlayTest'
import ContexTesttRoot from './contextTest'
import HookRefRoot from './hookRef'
import { HookUseLayoutEffect } from './hookUseLayoutEffect'
import UseStoreRoot from './useStore'
import { TreeRoot } from './tree'
/* ... */
// @ts-ignore
import Tree from './tree3'
import 'wasabi-tree/lib/index.css'

export const treeData = [
	{
		id: 1,
		value: 1,
		text: '父节点01',
		pid: 0,
		open: false,
		isParent: true,
		children: [
			{
				id: 11,
				value: 11,
				text: '父节点11',
				pid: 1,
				open: false,
				children: [
					{
						id: 111,
						value: 111,
						text: '子节点111',
						pid: 11,
						open: false,
					},
					{
						id: 112,
						value: 112,
						text: '子节点112',
						pid: 11,
						open: false,
					},
					{
						id: 113,
						value: 113,
						text: '子节点113',
						pid: 11,
						open: false,
					},
				],
			},
			{
				id: 12,
				value: 12,
				text: '父节点12',
				pid: 1,
				open: false,
				children: [
					{
						id: 121,
						value: 121,
						text: '子节点121',
						pid: 12,
						open: false,
					},
					{
						id: 122,
						value: 122,
						text: '子节点122',
						pid: 12,
						open: false,
					},
					{
						id: 123,
						value: 123,
						text: '子节点123',
						pid: 12,
						open: false,
					},
				],
			},
			{
				id: 13,
				value: 13,
				text: '父节点13',
				pid: 1,
				open: false,
			},
		],
	},
	{
		id: 2,
		value: 2,
		text: '父节点02',
		pid: 0,
		open: false,
		children: [
			{
				id: 21,
				value: 21,
				text: '父节点21',
				pid: 2,
				open: false,
			},
			{
				id: 22,
				value: 22,
				text: '父节点22',
				pid: 2,
				open: false,
			},
		],
	},
	{
		id: 3,
		value: 3,
		text: '父节点03',
		pid: 0,
		open: false,
		children: [
			{
				id: 31,
				value: 31,
				text: '父节点31',
				pid: 3,
				open: false,
			},
			{
				id: 32,
				value: 32,
				text: '父节点32',
				pid: 3,
				open: false,
			},
		],
	},
]

function TestPageRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`TestPageRoot ☆☆☆`, props)
	console.log(Tree)
	return (
		<>
			<Helmet>
				<title>Test Page</title>
			</Helmet>
			<Tree isSimpleData={true} name={'dwdw'} data={treeData}></Tree>
		</>
	)
}

export default React.memo(TestPageRoot)
