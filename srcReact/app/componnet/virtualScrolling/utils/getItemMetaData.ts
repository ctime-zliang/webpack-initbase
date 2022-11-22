import { TInstanceProps, TItemMetaDataItem } from '../types/types'

export const getItemMetadata = (itemHeightVisitor: (a: number) => number, index: number, instanceProps: TInstanceProps): TItemMetaDataItem => {
	const { itemMetadataMap, lastMeasuredIndex } = instanceProps
	if (index > lastMeasuredIndex) {
		let offset: number = 0
		if (lastMeasuredIndex >= 0) {
			const itemMetadata: TItemMetaDataItem = itemMetadataMap[lastMeasuredIndex]
			offset = itemMetadata.offset + itemMetadata.size
		}
		for (let i: number = lastMeasuredIndex + 1; i <= index; i++) {
			let size: number = itemHeightVisitor(i)
			itemMetadataMap[i] = {
				offset,
				size,
			}
			offset += size
		}
		instanceProps.lastMeasuredIndex = index
	}
	return itemMetadataMap[index]
}
