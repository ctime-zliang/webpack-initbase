import { Store } from 'redux'

export type TStoreReduxCommonAction<T> = {
	type: T
	data?: any
}

export type TReduxStoreExtend = {
	asyncReducers: any
}

export type TReduxStore = Store & TReduxStoreExtend
