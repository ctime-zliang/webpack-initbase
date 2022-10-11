import { proxy, useSnapshot } from 'valtio'
import { valtioStore } from './store'

export const useComparisonThreshold = (): boolean => {
	const THRESHOLD: number = 3
	const valtioStoreSnapshot = useSnapshot(valtioStore)
	return valtioStoreSnapshot.count >= THRESHOLD
}
