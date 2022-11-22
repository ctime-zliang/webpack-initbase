import { createListComponet } from './createListComponent'

const findNearestItemBinarySearch = (props: any, instanceProps: any, high: any, low: any, offset: any) => {
	while (low <= high) {
		const middle = low + Math.floor((high - low) / 2)
		const currentOffset = getItemMetadata(props, middle, instanceProps).offset
		if (currentOffset === offset) {
			return middle
		} else if (currentOffset < offset) {
			low = middle + 1
		} else if (currentOffset > offset) {
			high = middle - 1
		}
	}
	if (low > 0) {
		return low - 1
	} else {
		return 0
	}
}

// 获取每个条目对应的元数据  {index: {size, offset}}
const getItemMetadata = (props: any, index: any, instanceProps: any) => {
	// itemsize 自己穿入的函数
	const { itemSize } = props
	const { itemMetadataMap, lastMeasuredIndex } = instanceProps
	/// 当前获取的条目 比上一次测量过的条索引 大，说明此词条目没有测量过（都是从上往下滚动的）， 不知道 offset  和 size
	if (index > lastMeasuredIndex) {
		// 没有缓存过
		// 通过上一个测量过的条目 计算当前的条目的 offset
		let offset = 0
		if (lastMeasuredIndex >= 0) {
			// lastMeasuredIndex 之前的索引做过缓存
			const itemMetadata = itemMetadataMap[lastMeasuredIndex]
			offset = itemMetadata.offset + itemMetadata.size // 下一条的 offset 值
		}
		for (let i = lastMeasuredIndex + 1; i <= index; i++) {
			let size = itemSize(i)
			// 此条目对应的高度size 和 刚计算的 offset 值存储
			itemMetadataMap[i] = {
				offset,
				size,
			}
			offset += size // 下一个条目的offset 是 当前的offset + size
		}
		// 重新定义
		instanceProps.lastMeasuredIndex = index
	}
	// 虽然返回的事当前索引的信息，但是其实 <= index 的元素信息都已经被计算存储了
	return itemMetadataMap[index]
}

const getStartIndexForOffset = (props: any, scrollOffset: any, instanceProps: any) => {
	const { lastMeasuredIndex } = instanceProps
	// 这里是 从 0 开始到 lastMeasuredIndex 进行分割查找，每次查找会少一半
	return findNearestItemBinarySearch(props, instanceProps, lastMeasuredIndex, 0, scrollOffset)
}

const getEndIndexForOffset = (props: any, startIndex: any, scrollOffset: any, instanceProps: any) => {
	// 拿到可视区域的高度和元素数量
	const { height, itemCount } = props
	// 获取开始索引对应的元数据 ,开始索引的 offset 和 size
	const itemMetadata = getItemMetadata(props, startIndex, instanceProps)
	// 最大的 offset 值
	const maxOffset = itemMetadata.offset + height
	// startIndex 下一个元素的 offset 值
	let offset = itemMetadata.offset + itemMetadata.size

	let stopIndex = startIndex
	// 因为不确定可是区域内多少元素，所以需要从当前开始每次加下一个元素进行计算
	while (stopIndex < itemCount - 1 && offset < maxOffset) {
		stopIndex++
		offset += getItemMetadata(props, stopIndex, instanceProps).size // 加每个条目高度
	}
	// 当超出总数量或者 offset 偏移量超出 maxOffset 时，抛出
	return stopIndex
}

const getItemSize = (props: any, index: any, instanceProps: any) => {
	return getItemMetadata(props, index, instanceProps).size
}
const getItemOffset = (props: any, index: any, instanceProps: any) => {
	return getItemMetadata(props, index, instanceProps).offset
}

// 计算或者预估内容总高度  撑起来，出现滚动条
const getEstimatedTotalSize = (
	{ itemCount }: { itemCount: any },
	{ estimatedItemSize, lastMeasuredIndex, itemMetadataMap }: { estimatedItemSize: any; lastMeasuredIndex: any; itemMetadataMap: any }
) => {
	// 测量过的真是高度 + 未测量的预估高度
	let totalSizeOfMeasuredItems = 0 // 测量过的总高度
	if (lastMeasuredIndex >= 0) {
		const itemMetadata = itemMetadataMap[lastMeasuredIndex]
		// 我们只需要知道最后一个测量的元素即可知道实际测量的偏移量
		totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size
	}
	const numUnMeasuredItems = itemCount - lastMeasuredIndex - 1 // 未测量过的条目数量
	const totalSizeOfUnmesuredItems = numUnMeasuredItems * estimatedItemSize // 未测量过的条目的总高度

	// 总高度 = 实际测量过的高度 + 预估的高度
	return totalSizeOfUnmesuredItems + totalSizeOfMeasuredItems
}

const NotFixedSizeList = createListComponet({
	getEstimatedTotalSize, // 预计内容高度，固定高度直接相乘 就好
	getItemSize,
	getItemOffset,
	// 开始索引我们需要向下取整，即使 item 滚动到一半，我们也要渲染
	getStartIndexForOffset,
	// 结束索引的计算为 开始索引 + 中间能展示的索引个数
	getEndIndexForOffset,
})

export default NotFixedSizeList
