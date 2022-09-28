import { proxy, useSnapshot } from 'valtio'

export type TValtioStore = {
	counter: number
	timeStamp: number
}
export const valtioStore = proxy<TValtioStore>({
	counter: 0,
	timeStamp: -1,
})
export const valtioAction = {
	modifyCounter(): void {
		valtioStore.counter += 1
	},
	modifyTimeStamp(timeStamp: number): void {
		valtioStore.timeStamp = timeStamp
	},
}
