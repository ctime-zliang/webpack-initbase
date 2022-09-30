import { TStoreCommonAction } from '../public/types'
import { ACTION_TYPE as timeStamp_ACTION_TYPE } from '@/store/redux/timeStamp/types'
import { ACTION_TYPE as counter_ACTION_TYPE } from '@/store/redux/counter/types'
import { sleep } from '@/utils/utils'

export const changeStampAction = (params: any): ((dispatch: (a: TStoreCommonAction<string>) => void, getState: () => any) => void) => {
	return async (dispatch: (a: TStoreCommonAction<string>) => void, getState: () => any): Promise<void> => {
		console.log(params)
		console.log(getState())
		dispatch({
			type: timeStamp_ACTION_TYPE.SETTING_BTN_LOADIG,
			data: { isLoading: true },
		})
		await sleep(1500)
		dispatch({
			type: timeStamp_ACTION_TYPE.CHANGE_STAMP,
			data: { stamp: new Date().getTime() },
		})
		dispatch({
			type: timeStamp_ACTION_TYPE.SETTING_BTN_LOADIG,
			data: { isLoading: false },
		})
		/**
		 * 派发其他 store 模块中的 action-type
		 */
		dispatch({
			type: counter_ACTION_TYPE.MODIFY_COUNTER,
			data: null,
		})
	}
}
