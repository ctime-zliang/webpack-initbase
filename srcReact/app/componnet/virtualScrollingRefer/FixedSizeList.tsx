import { createListComponet } from './createListComponent'

const DEFAULT_ESTIMATED_SIZE = 50

const FixedSizeList = createListComponet({
	getEstimatedTotalSize: ({ itemSize, itemCount }: { itemSize: any; itemCount: number }) => itemSize * itemCount, // 预计内容高度，固定高度直接相乘 就好
	getItemSize: ({ itemSize }: { itemSize: any }) => itemSize, // 固定高度直接使用
	getItemOffset: ({ itemSize }: { itemSize: any }, index: number) => itemSize * index, // 因为元素是定位的，同时高度固定，所以 top 值可如此计算
	// 开始索引我们需要向下取整，即使 item 滚动到一半，我们也要渲染
	getStartIndexForOffset: ({ itemSize }: { itemSize: any }, offset: number) => {
		return Math.floor(offset / itemSize)
	},
	// 结束索引的计算为 开始索引 + 中间能展示的索引个数
	getEndIndexForOffset: ({ height, itemSize }: { height: any; itemSize: any }, startIndex: number) => {
		return startIndex + Math.ceil(height / itemSize) - 1 // 结束索引闭区间，所以 -1 (即算到了第八个，但是第八个其实是不展示的)
	},
})

export default FixedSizeList
