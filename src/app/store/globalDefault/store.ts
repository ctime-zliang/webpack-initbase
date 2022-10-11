import { TStore } from './types'

export const createInitialState = (): TStore => {
	return {
		g_languageSetting: 'zh_cn', // zh_cn | en_us
	}
}
