import React from 'react'

export type TListComponentProps = TListComponentDefaultProps & TListComponentCallProps
export type TListComponentCallProps = {
	itemCount: number
	itemHeight: (number | string) | ((a: number) => number)
	containerHeight: string
	containerWidth?: string
	containerStyle?: React.CSSProperties
	wrapperStyle?: React.CSSProperties
	initContainerScrollTop?: number
	onScroll?: ((y: number, x: number) => void) | null
	children?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.FunctionComponent<any>
}

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

export type TListComponentDefaultProps = {
	topBufferSize: number
	bottomBufferSize: number
	initContainerScrollTop: number
	containerHeight: number | string
	containerWidth: number | string
	children?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.FunctionComponent<any>
}

export type TCreateListComponetParams = {
	getStartIndexByOffset: (props: TListComponentProps, containerScrollTop: number, instanceProps: TInstanceProps) => number
	getEndIndexByOffset: (props: TListComponentProps, startIndex: number, instanceProps: TInstanceProps) => number
	getEstimatedTotalSize: (props: TListComponentProps, instanceProps: TInstanceProps) => number
	getItemHeight: (props: TListComponentProps, index: number, instanceProps: TInstanceProps) => number
	getItemOffsetY: (props: TListComponentProps, index: number, instanceProps: TInstanceProps) => number
	createInstanceProps: (estimatedItemSize?: number) => TInstanceProps
}

export type TCreateContainerStyleObject = {
	position: string
	width: string | number
	height: string | number
	overflow: string
	willChange: string
	[key: string]: any
}

export type TCreateWrapperStyleObject = {
	width: string | number
	height: string | number
	[key: string]: any
}

export type TCreateItemStyle = {
	position: string
	width: string | number
	height: string | number
	top: string | number
	left: string | number
}

export type TItemMetaDataItem = {
	size: number
	offset: number
}
export type TInstanceProps = {
	estimatedItemSize: number
	itemMetadataMap: {
		[index: number]: TItemMetaDataItem
	}
	lastMeasuredIndex: number
}
