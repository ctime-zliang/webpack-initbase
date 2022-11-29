import { DEFAULT_ESTIMATED_SIZE } from '../config/config'
import { TInstanceProps, TItemMetaDataItem, TListComponentProps } from '../types/types'
import { findNearestItemBinarySearch } from '../utils/findNearestItemBinarySearch'
import { getItemMetadata } from '../utils/getItemMetaData'
import { createListComponet2 } from './createListComponent2'

/**
 * 返回当前滚动范围内的起始索引
 **/
const getStartIndexByOffset = (props: TListComponentProps, containerScrollTop: number, instanceProps: TInstanceProps): number => {
	const { itemHeight } = props
	const { lastMeasuredIndex } = instanceProps
	return findNearestItemBinarySearch(itemHeight as (a: number) => number, instanceProps, lastMeasuredIndex, 0, containerScrollTop)
}

/**
 * 返回当前滚动范围内的终止索引
 **/
const getEndIndexByOffset = (props: TListComponentProps, startIndex: number, instanceProps: TInstanceProps): number => {
	const { containerHeight, itemCount, itemHeight } = props
	const itemMetadata: TItemMetaDataItem = getItemMetadata(itemHeight as (a: number) => number, startIndex, instanceProps)
	const maxOffset: number = itemMetadata.offset + parseInt(containerHeight as string)
	let offset: number = itemMetadata.offset + itemMetadata.size
	let stopIndex: number = startIndex
	while (stopIndex < itemCount - 1 && offset < maxOffset) {
		stopIndex++
		const stopItemMetadata: TItemMetaDataItem = getItemMetadata(itemHeight as (a: number) => number, stopIndex, instanceProps)
		offset += stopItemMetadata.size
	}
	return stopIndex
}

/**
 * 计算列表包裹层高度
 **/
const getEstimatedTotalSize = (props: TListComponentProps, instanceProps: TInstanceProps) => {
	const { itemCount } = props
	const { estimatedItemSize, lastMeasuredIndex, itemMetadataMap } = instanceProps
	let totalSizeOfMeasuredItems: number = 0
	if (lastMeasuredIndex >= 0) {
		const itemMetadata: TItemMetaDataItem = itemMetadataMap[lastMeasuredIndex]
		totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size
	}
	const numUnMeasuredItems: number = itemCount - lastMeasuredIndex - 1
	const totalSizeOfUnmesuredItems: number = numUnMeasuredItems * estimatedItemSize
	return totalSizeOfUnmesuredItems + totalSizeOfMeasuredItems
}

/**
 * 返回单个元素的固定高度
 **/
const getItemHeight = (props: TListComponentProps, index: number, instanceProps: TInstanceProps): number => {
	const { itemHeight } = props
	const itemMetadata: TItemMetaDataItem = getItemMetadata(itemHeight as (a: number) => number, index, instanceProps)
	return itemMetadata.size
}

/**
 * 返回指定索引位置的元素的垂直偏置值
 **/
const getItemOffsetY = (props: TListComponentProps, index: number, instanceProps: TInstanceProps): number => {
	const { itemHeight } = props
	const itemMetadata: TItemMetaDataItem = getItemMetadata(itemHeight as (a: number) => number, index, instanceProps)
	return itemMetadata.offset
}

/**
 * 创建缓存对象
 **/
const createInstanceProps = (estimatedItemSize: number = DEFAULT_ESTIMATED_SIZE) => {
	return {
		estimatedItemSize,
		itemMetadataMap: {},
		lastMeasuredIndex: -1,
	}
}

const NotFixedSizeList2 = createListComponet2({
	getEstimatedTotalSize,
	getItemHeight,
	getItemOffsetY,
	getStartIndexByOffset,
	getEndIndexByOffset,
	createInstanceProps,
})

export default NotFixedSizeList2
