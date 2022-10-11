import { TStoreReduxCommonAction } from '../../public/types'
import { ACTION_TYPE as counter_ACTION_TYPE } from '@/app/store/redux/counter/types'

export const changeCountAction = (params: any): ((dispatch: (a: TStoreReduxCommonAction<string>) => void, getState: () => any) => void) => {
	return async (dispatch: (a: TStoreReduxCommonAction<string>) => void, getState: () => any): Promise<void> => {
		console.log(params)
		console.log(getState())
		dispatch({
			type: counter_ACTION_TYPE.MODIFY_COUNTER,
			data: null,
		})
	}
}
