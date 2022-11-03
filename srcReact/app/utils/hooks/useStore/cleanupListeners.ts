import { TUseStore } from '.'
import { TListenerEffectItem } from './newListenerEffect'

export function cleanupListeners(store: TUseStore, listener: TListenerEffectItem): void {
	/**
	 * 从 store.listeners 中移除指定的 listener
	 */
	store.listeners = (store.listeners as Array<TListenerEffectItem>).filter((item: any) => {
		return item !== listener
	})
}
