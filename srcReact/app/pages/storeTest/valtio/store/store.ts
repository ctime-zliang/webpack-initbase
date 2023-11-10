import { proxy, useSnapshot } from 'valtio'
import { TValtioStore } from './types'

export const valtioStore = proxy<TValtioStore>({
	count: 0,
	timeStamp: -1,
})
export const valtioAction = {
	modifyCounter(): void {
		valtioStore.count += 1
	},
	modifyTimeStamp(timeStamp: number): void {
		valtioStore.timeStamp = timeStamp
	},
}
