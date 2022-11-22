import { globalConfig } from '../../config/config'
import { v4 as uuidv4 } from 'uuid'
import { TStore } from './types'

export const createInitialState = (): TStore => {
	return {
		g_languageSetting: globalConfig.lang,
		linkData: [
			{
				subject: 'Modules List',
				list: [{ id: uuidv4(), title: 'Article', desc: 'Article Module Case', path: '/article' }],
			},
			{
				subject: 'Store Manager',
				list: [
					{ id: uuidv4(), title: 'Valtio State Manager', desc: 'Valtio Store Manager Case', path: '/valtio' },
					{ id: uuidv4(), title: 'Redux State Manager', desc: 'Redux Store Manager Case', path: '/redux' },
				],
			},
			{
				subject: 'Base Component Lib',
				list: [
					{ id: uuidv4(), title: 'Paginataion', desc: 'Pagination Base Component', path: '/componentLib/pagination' },
					{ id: uuidv4(), title: 'Tree', desc: 'Tree Base Component', path: '/componentLib/tree' },
					{ id: uuidv4(), title: 'Virtual Scrolling', desc: 'VirtualScrolling Base Component', path: '/componentLib/virtualscrolling' },
				],
			},
			{
				subject: 'Test Page',
				list: [{ id: uuidv4(), title: 'Test Page', desc: 'Test Case Page', path: '/testpage' }],
			},
		],
	}
}
