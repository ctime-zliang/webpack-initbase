import { TProxyObjectHandlerItem } from './types'

export const versionHolder: [number, number] = [1, 1]

export const globalProxyObjectHandlerMap: WeakMap<object, TProxyObjectHandlerItem> = new WeakMap()
export const globalSnapCache: WeakMap<object, any> = new WeakMap()

export enum EMarkOperation {
	SET = 'SET',
	GET = 'GET',
	DELETE = 'DELETE',
}
