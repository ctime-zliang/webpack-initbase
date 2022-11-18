import { TTreeDataItem } from 'srcReact/app/componnet/tree'

export const dataLine1 = [
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

export const dataLine2: Array<TTreeDataItem> = [
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

export const dataLine3 = [
	{
		title: '一级分类',
		id: '001',
		children: [
			{
				title: '二级分类',
				id: '0011',
				children: [
					{
						title: '三级分类',
						id: '00111',
					},
				],
			},
			{
				title: '二级分类',
				id: '0012',
				children: [
					{
						title: '三级分类',
						id: '00121',
					},
				],
			},
		],
	},
]
