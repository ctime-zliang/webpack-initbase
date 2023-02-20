export default [
	{
		type: 'item',
		title: '1-1',
		cmd: '1-1',
		disabled: true,
	},
	{ type: 'separator' },
	{
		type: 'submenu',
		title: '1-2',
		cmd: '1-2',
		disabled: false,
		subMenu: [
			{
				type: 'item',
				title: '1-2-1',
				cmd: '1-2-1',
				disabled: true,
			},
			{
				type: 'submenu',
				title: '1-2-2',
				cmd: '1-2-2',
				disabled: false,
				subMenu: [
					{
						type: 'item',
						title: '1-2-2-1',
						cmd: '1-2-2-1',
						disabled: false,
					},
					{
						type: 'item',
						title: '1-2-2-2',
						cmd: '1-2-2-2',
						disabled: false,
					},
					{
						type: 'item',
						title: '1-2-2-3',
						cmd: '1-2-2-3',
						disabled: false,
					},
				],
			},
		],
	},
	{ type: 'separator' },
	{
		type: 'item',
		title: '1-3',
		cmd: '1-3',
		disabled: false,
	},
	{
		type: 'item',
		title: '1-4',
		cmd: '1-4',
		disabled: false,
	},
]
