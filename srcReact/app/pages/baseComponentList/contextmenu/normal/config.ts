export default [
	{
		title: '1-1',
		cmd: '1-1',
		disabled: true,
		checked: true,
	},
	{ type: 'SEPARATOR' },
	{
		title: '1-2: 解压缩操作',
		cmd: '1-2',
		disabled: false,
		subMenu: [
			{
				title: '1-2-1',
				cmd: '1-2-1',
				disabled: true,
			},
			{
				title: '1-2-2',
				cmd: '1-2-2',
				disabled: false,
				subMenu: [
					{
						title: '1-2-2-1',
						cmd: '1-2-2-1',
						disabled: false,
					},
					{ type: 'SEPARATOR' },
					{
						title: '1-2-2-2',
						cmd: '1-2-2-2',
						disabled: false,
					},
					{
						title: '1-2-2-3',
						cmd: '1-2-2-3',
						disabled: false,
					},
				],
			},
		],
	},
	{ type: 'SEPARATOR' },
	{
		title: '1-3: 在当前目录创建新的文件夹',
		cmd: '1-3',
		disabled: false,
		tips: 'Ctrl + L',
	},
	{
		title: '1-4',
		cmd: '1-4',
		disabled: false,
		tips: 'Ctrl + M',
	},
]
