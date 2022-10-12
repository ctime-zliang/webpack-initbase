import { v4 as uuidv4 } from 'uuid'
import { TStore } from './types'

export const createInitialState = (): TStore => {
	return {
		g_languageSetting: 'zh_cn', // zh_cn | en_us
		linkList: [
			{ id: uuidv4(), title: 'Article', path: '/article' },
			{ id: uuidv4(), title: 'Valtio State Manager', path: '/valtio' },
			{ id: uuidv4(), title: 'Redux State Manager', path: '/redux' },
			{ id: uuidv4(), title: 'Test Page', path: '/testpage' },
		],
	}
}
