import { EMarkOperation } from './config'

export type TKeyPath = string | symbol
export type TListenerHandler = (op: TMarkOperationStructureItem) => void

export type TProxyObjectHandlerItem = {
	data: PlainObject
	ensureVersion: (nextCheckVersion?: number) => number
	createSnapshot: (target: PlainObject, version: number) => PlainObject
	addListener: (listener: TListenerHandler) => () => void
	listenerRemove: () => void
}

export type TSnapCacheItem = [number, PlainObject]

export type TMarkOperationStructureItem = [EMarkOperation, Array<string>, any, any]
