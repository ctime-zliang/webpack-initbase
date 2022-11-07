import React from 'react'

export type TTreeDataItem = {
	title: string | number
	id: TTreeDataItemID
	children?: Array<TTreeDataItem>
}

export type TTreeDataItemID = string | number

export type TTreeRootPorps = {
	/**
	 * 待渲染的层级数据列表
	 */
	data: Array<TTreeDataItem>
	/**
	 * 容器 style 样式描述对象
	 */
	containerStyleObject?: { [key: string]: any }
	/**
	 * 组件控件宽度
	 * 		单个控件的宽度, 例如 展开/收起按钮所占区域的宽度
	 */
	treeWidgetItemWidth?: string
	/**
	 * 显示 ${data[index].title} 的元素的样式描述对象
	 */
	itemStyleObject?: { [key: string]: any }
	/**
	 * 是否显示连接线
	 */
	showTagLine?: boolean
	/**
	 * 是否显示 展开/收起 按钮
	 */
	showExpandBtn?: boolean
	/**
	 * 是否展开所有层级
	 */
	expandAll?: boolean
	/**
	 * 是否支持多选
	 */
	multiSelect?: boolean
	/**
	 * 是否设置整体布局左移对齐外部容器左边界
	 */
	leftTranslationalAlignment?: boolean
	/**
	 * 初始选中的 ${data[index].id} 的集合
	 */
	selectedIds?: Array<string>
	/**
	 * 展开/收起 时执行函数
	 */
	onExpand?: ((a: TTreeDataItem, b: TComponentTreeRowData) => void) | null
	/**
	 * 选中时执行函数
	 */
	onClick?: ((a: Array<TTreeDataItemID>, b: TTreeDataItem, c: TComponentTreeRowData) => void) | null
	/**
	 * 自定义渲染 ${data[index].title}
	 */
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
