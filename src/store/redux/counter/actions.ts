import { TStoreCommonAction } from '../public/types'
import { ACTION_TYPE as counter_ACTION_TYPE } from '@/store/redux/counter/types'

/**
 * 同一个 action 的两种写法
 *      1. 直接返回 action-type
 *      2. 调用函数处理并在函数中派发 action-type
 */
// export const changeCountAction = (params: any): TStoreCommonAction<string> => {
// 	console.log(params)
// 	return {
// 		type: counter_ACTION_TYPE.MODIFY_COUNTER,
// 		data: null,
// 	}
// }
export const changeCountAction = (params: any): ((dispatch: (a: TStoreCommonAction<string>) => void, getState: () => any) => void) => {
	return async (dispatch: (a: TStoreCommonAction<string>) => void, getState: () => any): Promise<void> => {
		console.log(params)
		console.log(getState())
		dispatch({
			type: counter_ACTION_TYPE.MODIFY_COUNTER,
			data: null,
		})
	}
}
