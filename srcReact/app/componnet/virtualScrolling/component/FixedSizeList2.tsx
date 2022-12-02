import { DEFAULT_ESTIMATED_SIZE } from '../config/config'
import { TInstanceProps, TListComponentProps } from '../types/types'
import { createListComponet2 } from './createListComponent2'
import { createListComponentTransfrom } from './createListComponentTransfrom'

/**
 * 返回当前滚动范围内的起始索引
 **/
const getStartIndexByOffset = (props: TListComponentProps, containerScrollTop: number, instanceProps: TInstanceProps): number => {
	const { itemHeight } = props
	const _itemHeight = parseInt(itemHeight as string)
	return Math.floor(containerScrollTop / _itemHeight)
}

/**
 * 返回当前滚动范围内的终止索引
 **/
const getEndIndexByOffset = (props: TListComponentProps, startIndex: number, instanceProps: TInstanceProps): number => {
	const { itemHeight, containerHeight } = props
	return startIndex + Math.ceil(parseInt(containerHeight as string) / parseInt(itemHeight as string)) - 1
}

/**
 * 计算列表包裹层高度
 * 		总体高度 = 单个元素固定高度 * 元素个数
 **/
const getEstimatedTotalSize = (props: TListComponentProps, instanceProps: TInstanceProps): number => {
	const { itemHeight, itemCount } = props
	return parseInt(itemHeight as string) * itemCount
}

/**
 * 返回单个元素的固定高度
 **/
const getItemHeight = (props: TListComponentProps, index: number, instanceProps: TInstanceProps): number => {
	const { itemHeight } = props
	return parseInt(itemHeight as string)
}

/**
 * 返回指定索引位置的元素的垂直偏置值
 * 		对于固定高度的元素, 即 垂直偏置值 = 单个元素固定高度 * 该元素索引
 **/
const getItemOffsetY = (props: TListComponentProps, index: number, instanceProps: TInstanceProps): number => {
	const { itemHeight } = props
	return parseInt(itemHeight as string) * index
}

/**
 * 创建缓存对象
 **/
const createInstanceProps = (estimatedItemSize: number = DEFAULT_ESTIMATED_SIZE): TInstanceProps => {
	return {
		estimatedItemSize,
		itemMetadataMap: {},
		lastMeasuredIndex: -1,
	}
}

const FixedSizeList2 = createListComponentTransfrom({
	getEstimatedTotalSize,
	getItemHeight,
	getItemOffsetY,
	getStartIndexByOffset,
	getEndIndexByOffset,
	createInstanceProps,
})

export default FixedSizeList2
