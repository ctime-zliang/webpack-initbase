import React from 'react'

export type TTreeDataItem = {
	title: string | number
	id?: string | number
	children?: Array<TTreeDataItem>
}

export type TTreeRootPorps = {
	data: Array<TTreeDataItem>
	containerClassName?: string
	containerStyleObject?: { [key: string]: any }
	treeTipsLineWidth?: string
	itemStyleObject?: { [key: string]: any }
	showTagLine?: boolean
	showExpandBtn?: boolean
	expandAll?: boolean
	onExpand?: ((a: TTreeDataItem, b: TComponentTreeRowData) => void) | null
	onClick?: ((a: TTreeDataItem, b: TComponentTreeRowData) => void) | null
	itemRender?: ((a: TTreeDataItem, b: TComponentTreeRowData) => React.ReactElement) | null
}

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

export type TComponentTreeRowData = {
	id: string
	expand: boolean | undefined | null
	children: Array<TComponentTreeRowData>
	isLeaf: boolean
	levels: Array<TLevels>
	sourceData: TTreeDataItem
}

export type TLevels = {
	key: string
	stag: number
}
