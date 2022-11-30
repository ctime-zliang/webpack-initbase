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

export function createListComponentTransfrom(params: TCreateListComponetParams): (a: TListComponentCallProps) => React.ReactElement {
	const { getEstimatedTotalSize, getItemHeight, getItemOffsetY, getStartIndexByOffset, getEndIndexByOffset, createInstanceProps } = params
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
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: '100%',
			willChange: 'transform',
			...wrapperStyle,
		}
		const scrollColludeStyleObject: any = {
			width: '100%',
			height: `${getEstimatedTotalSize(globalProfile, instanceProps)}px`,
		}

		const getItemStyle = (index: number = 0): TCreateItemStyle => {
			return {
				position: 'static',
				width: '100%',
				height: getItemHeight(globalProfile, index, instanceProps),
				top: 0,
				left: 0,
			}
		}
		const getIndexRangeToRender = (): [number, number] => {
			const { topBufferSize, bottomBufferSize, itemCount } = globalProfile
			const startIndex: number = getStartIndexByOffset(globalProfile, containerScrollTop, instanceProps)
			const endIndex: number = getEndIndexByOffset(globalProfile, startIndex, instanceProps)
			const extendStartIndex: number = Math.max(0, startIndex - topBufferSize)
			const extendEndIndex: number = Math.min(itemCount - 1, endIndex + bottomBufferSize)
			return [extendStartIndex, extendEndIndex]
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

		const renderItems = (startIndex: number, endIndex: number): Array<React.ReactElement> => {
			const items: Array<React.ReactElement> = []
			if (itemCount > 0) {
				for (let i: number = startIndex; i <= endIndex; i++) {
					const itemStyle: TCreateItemStyle = getItemStyle(i)
					items.push(<Component index={i} style={itemStyle} key={i} />)
				}
			}
			return items
		}

		const [extendStartIndex, extendEndIndex] = getIndexRangeToRender()
		const rowItems: Array<React.ReactElement> = renderItems(extendStartIndex, extendEndIndex)
		const translateY: number = getItemOffsetY(globalProfile, extendStartIndex, instanceProps)
		wrapperStyleObject.transform = `translate3d(0, ${translateY}px, 5px)`

		return (
			<div
				data-vs-tag={'virtual-scroll-container'}
				ref={scrollContainerRef}
				style={containerStyleObject as React.CSSProperties}
				onScroll={onContainerScrollAction}
			>
				<div style={scrollColludeStyleObject}></div>
				<div data-vs-tag={'virtual-scroll-wrapper'} style={wrapperStyleObject}>
					{rowItems}
				</div>
			</div>
		)
	}
}
