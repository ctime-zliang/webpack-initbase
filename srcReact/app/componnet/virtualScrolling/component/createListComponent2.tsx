import React, { useRef, useState } from 'react'
import { createListComponetFCDefaultProps } from '../config/config'
import {
	TCreateContainerStyleObject,
	TCreateWrapperStyleObject,
	TCreateListComponetParams,
	TCreateItemStyle,
	TListComponentProps,
	TListComponentCallProps,
	TInstanceProps,
} from '../types/types'

export function createListComponet2(params: TCreateListComponetParams): (a: TListComponentCallProps) => React.ReactElement {
	const { getEstimatedTotalSize, getItemSize, getItemOffset, getStartIndexByOffset, getEndIndexByOffset, createInstanceProps } = params
	return (props: TListComponentCallProps): React.ReactElement => {
		const globalProfile: TListComponentProps = { ...createListComponetFCDefaultProps, ...props } as TListComponentProps
		const { containerWidth, containerHeight, itemCount, containerStyle = {}, wrapperStyle = {} } = globalProfile
		const Component = (props as any).children as any
		const [containerScrollTop, setContainerScrollTop] = useState<number>(0)
		const instancePropsRef = useRef<TInstanceProps>(createInstanceProps())
		const instanceProps: TInstanceProps = instancePropsRef.current

		const containerStyleObject: TCreateContainerStyleObject = {
			position: 'relative',
			width: containerWidth,
			height: containerHeight,
			overflow: 'auto',
			willChange: 'transform',
			...containerStyle,
		}
		const wrapperStyleObject: TCreateWrapperStyleObject = {
			width: '100%',
			height: getEstimatedTotalSize(globalProfile, instanceProps),
			...wrapperStyle,
		}

		const getItemStyle = (index: number = 0): TCreateItemStyle => {
			return {
				position: 'absolute',
				width: '100%',
				height: getItemSize(globalProfile, index, instanceProps),
				top: getItemOffset(globalProfile, index, instanceProps),
				left: 0,
			}
		}
		const getRangeToRender = (): [number, number] => {
			const { overscanCount, itemCount } = globalProfile
			const startIndex: number = getStartIndexByOffset(globalProfile, containerScrollTop, instanceProps)
			const endIndex: number = getEndIndexByOffset(globalProfile, startIndex, instanceProps)
			const eachStartIndex: number = Math.max(0, startIndex - overscanCount)
			const eachEndIndex: number = Math.min(itemCount - 1, endIndex + overscanCount)
			return [eachStartIndex, eachEndIndex]
		}
		const onContainerScrollAction = (e: React.BaseSyntheticEvent): void => {
			setContainerScrollTop((e.target as HTMLElement).scrollTop)
		}

		const renderItems = (): Array<React.ReactElement> => {
			const items: Array<React.ReactElement> = []
			if (itemCount > 0) {
				const [startIndex, endIndex] = getRangeToRender()
				for (let i: number = startIndex; i <= endIndex; i++) {
					const itemStyle: TCreateItemStyle = getItemStyle(i)
					items.push(<Component index={i} style={itemStyle} key={i} />)
				}
			}
			return items
		}

		return (
			<div style={containerStyleObject as React.CSSProperties} onScroll={onContainerScrollAction}>
				<div style={wrapperStyleObject}>{renderItems()}</div>
			</div>
		)
	}
}
