import { EMarkOperation } from './config'
import { ProxyStore } from './Proxy'

export type TKeyPath = string | symbol
export type TListenerHandler = (op: TMarkOperationStructureItem) => void
export type TPropProxyObjectHandlerItem = {
	handlerItem: TProxyObjectHandlerItem
	listenerRemove: () => void
}

export type TProxyObjectHandlerItem = {
	hostInstance: ProxyStore
	/* ... */
	data: PlainObject
	ensureVersion: (nextCheckVersion?: number) => number
	createSnapshot: (target: PlainObject, version: number) => PlainObject
	addListener: (listener: TListenerHandler) => () => void
}

export type TMarkOperationStructureItem = [EMarkOperation, Array<string>, any, any]
