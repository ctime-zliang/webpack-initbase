import { Store } from 'redux'

export type TCommonComponentBaseProps = {
	reduxStore: Store
	[key: string]: any
}
