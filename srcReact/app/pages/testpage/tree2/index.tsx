import React, { useEffect, useState } from 'react'

// export enum CheckedType {
// 	ALL_CHECKED = 'ALL_CHECKED',
// 	NOT_CHECKED = 'NOT_CHECKED',
// 	INDETERMINATE_CHECKED = 'INDETERMINATE_CHECKED ',
// }

// export interface TreeItem {
// 	// 外部传入字段
// 	key: string | number // 每条数据唯一key
// 	title: string // 数据的显示内容
// 	icon: any // 自定义显示图标
// 	children?: Array<TreeItem> // 所有child集合
// 	disabled: boolean // 是否禁用状态

// 	// 自动生成字段
// 	isLeaf?: boolean // 是否是最后一个叶子节点
// 	deep?: number // 节点深度
// 	expand?: boolean // 是否展开
// 	parentId?: string | number
// 	visible?: boolean // 是否显示
// 	listIndex?: number // 列表中对应的索引
// 	isLastSiblingCollection?: Array<number> // 节点如果没有下一个兄弟节点，记录该节点的deep,放入 child节点的isLastSiblingCollection集合中（不显示showLine）
// 	checked?: CheckedType // 是否复选框选中
// 	selected?: boolean // 是否label选中
// }

// export interface TreeProps {
// 	// 原始children 结构data数据
// 	treeData: Array<TreeItem>

// 	// 展开关闭相关参数
// 	expandedKeys?: Array<string | number> // expand的节点id集合
// 	defaultExpandedKeys?: Array<string | number> //// 默认打开的id
// 	onExpand?: (expandedKeys: Array<number | string>, extrea?: any) => void

// 	// 复选框相关参数
// 	checkable?: boolean // 是否使用复选框
// 	checkedKeys?: Array<string | number> // 选中项id(受控组件，优先于defaultCheckedKeys使用)
// 	defaultCheckedKeys?: Array<string | number> // 默认选中的id
// 	checkStrictly?: boolean // checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
// 	onCheck?: (checkedKeys: Array<string | number>, extrea?: any) => void // 选中的事件

// 	// 节点点击相关参数
// 	multiple?: boolean // 支持节点select多选
// 	selectedKeys?: Array<string | number> // 是否选中
// 	onSelect?: (checkedKeys: Array<string | number>, extrea: any) => void // 选中的事件
// 	defaultSelectedKeys?: Array<string | number> // 默认选中的id,用于非受控组件

// 	isVirtual?: boolean // 是否使用虚拟列表

// 	// css界面显示相关参数
// 	className?: string // 自定义class名称
// 	style: Object // 自定义style
// 	switcherIconUp?: any // expand切换图标Up
// 	switcherIconDown?: any // expand切换图标Down
// 	showLine?: boolean // 是否显示带线样式结构
// }
