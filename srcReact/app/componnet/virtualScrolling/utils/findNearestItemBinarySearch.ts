import { TInstanceProps, TItemMetaDataItem } from '../types/types'
import { getItemMetadata } from './getItemMetaData'

export const findNearestItemBinarySearch = (
	itemHeightVisitor: (a: number) => number,
	instanceProps: TInstanceProps,
	high: number,
	low: number,
	containerScrollTop: number
): number => {
	while (low <= high) {
		const middle: number = low + Math.floor((high - low) / 2)
		const currentMetaData: TItemMetaDataItem = getItemMetadata(itemHeightVisitor, middle, instanceProps)
		const currentOffset = currentMetaData.offset
		if (currentOffset === containerScrollTop) {
			return middle
		} else if (currentOffset < containerScrollTop) {
			low = middle + 1
		} else if (currentOffset > containerScrollTop) {
			high = middle - 1
		}
	}
	if (low > 0) {
		return low - 1
	} else {
		return 0
	}
}
