import { DataItem } from '../types/types'

export function findItemByValue(listData: Array<DataItem>, value: string): DataItem | null {
	for (let i: number = listData.length - 1; i >= 0; i--) {
		if (listData[i].value === value) {
			return listData[i]
		}
	}
	return null
}
