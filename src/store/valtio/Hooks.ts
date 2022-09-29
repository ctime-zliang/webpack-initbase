import { proxy, useSnapshot } from 'valtio'
import { valtioStore } from './store'

export const useComparisonThreshold = (): boolean => {
	const threshold: number = 3
	const valtioStoreSnapshot = useSnapshot(valtioStore)
	return valtioStoreSnapshot.counter >= threshold
}
