import { ProxyStore as _ProxyStore } from './Proxy'
import { subscribe as _subscribe, snapshot as _snapshot } from './utils'
import { TMarkOperationStructureItem as _TMarkOperationStructureItem } from './types'

export type MarkOperationStructureItem = _TMarkOperationStructureItem

export const ProxyStore = _ProxyStore
export const subscribe = _subscribe
export const snapshot = _snapshot
