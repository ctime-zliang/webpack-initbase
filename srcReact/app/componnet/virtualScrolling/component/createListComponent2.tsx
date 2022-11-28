import React, { useEffect, useRef, useState } from 'react'
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
	const { getEstimatedTotalSize, getItemHeight, getItemOffset, getStartIndexByOffset, getEndIndexByOffset, createInstanceProps } = params
	return (props: TListComponentCallProps): React.ReactElement => {
		const globalProfile: TListComponentProps = { ...createListComponetFCDefaultProps, ...props } as TListComponentProps
		const { initContainerScrollTop, containerWidth, containerHeight, itemCount, containerStyle = {}, wrapperStyle = {}, onScroll } = globalProfile
		const Component = (props as any).children as any
		const [containerScrollTop, setContainerScrollTop] = useState<number>(initContainerScrollTop)
		const scrollContainerRef = useRef<HTMLDivElement>(null)
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
				height: getItemHeight(globalProfile, index, instanceProps),
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
			const scrollTop: number = (e.target as HTMLElement).scrollTop
			const scrollLeft: number = (e.target as HTMLElement).scrollLeft
			setContainerScrollTop((e.target as HTMLElement).scrollTop)
			onScroll && onScroll(scrollTop, scrollLeft)
		}

		useEffect((): void => {
			if (initContainerScrollTop !== containerScrollTop) {
				setContainerScrollTop(initContainerScrollTop)
				if (scrollContainerRef.current) {
					scrollContainerRef.current.scrollTop = initContainerScrollTop
				}
			}
		}, [initContainerScrollTop])

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
			<div ref={scrollContainerRef} style={containerStyleObject as React.CSSProperties} onScroll={onContainerScrollAction}>
				<div style={wrapperStyleObject}>{renderItems()}</div>
			</div>
		)
	}
}
