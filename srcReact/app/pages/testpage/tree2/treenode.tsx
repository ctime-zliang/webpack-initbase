import React from 'react'
// import CheckBox from './CheckBox'
// import { BizDown, BizMinus_square, BizPlus_square, BizUp } from '../Icon/icons'
// import { TreeeNodeProps } from './type'
// import './index.less'

// const TreeNode = ({
// 	data,
// 	prefixCls,
// 	toggleExpand,
// 	toogleChecked,
// 	onSelect,
// 	switcherIconUp,
// 	switcherIconDown,
// 	showLine,
// 	checkable,
// }: TreeeNodeProps) => {
// 	const { listIndex, deep, expand, selected, icon, checked, title, isLeaf, disabled, isLastSiblingCollection } = data

// 	/**
// 	 * 绘制tree的连接线
// 	 * @param item
// 	 */
// 	const getTreeIndent = () => {
// 		let index = 0

// 		// 循环，深度为多少，就往后移动多少个span
// 		let indent = []
// 		while (index < deep) {
// 			indent.push(
// 				<span key={index} className={`${prefixCls}-tree-${isLastSiblingCollection.includes(index++) || !showLine ? 'leaf' : 'indent'}`} />
// 			)
// 		}

// 		// 如果不是最后一个叶子节点，则放入切换的switcher按钮
// 		indent.push(
// 			!isLeaf ? (
// 				<span
// 					key={index}
// 					className={`${prefixCls}-tree-switcher-${expand ? 'open' : 'close'}`}
// 					onClick={() => {
// 						toggleExpand(data)
// 					}}
// 				>
// 					{' '}
// 					{expand
// 						? switcherIconUp || (showLine ? <BizMinus_square /> : <BizUp />)
// 						: switcherIconDown || (showLine ? <BizPlus_square /> : <BizDown />)}
// 				</span>
// 			) : null
// 		)

// 		return indent
// 	}

// 	return (
// 		<div className={`${prefixCls}-tree-item`}>
// 			{/* 前排缩进 */}
// 			{getTreeIndent()}

// 			{/* 是否使用checkbox */}
// 			{checkable && (
// 				<span className={`${prefixCls}-tree-icon`}>
// 					<CheckBox
// 						disabled={disabled}
// 						checked={checked}
// 						changeEvent={() => {
// 							toogleChecked(data)
// 						}}
// 					/>
// 				</span>
// 			)}

// 			{/* 是否展示icon */}
// 			{icon && <span className={`${prefixCls}-tree-icon`}>{icon}</span>}

// 			{/* 显示内容: 两个span 为了 选中区域 显示部分 */}
// 			<span className={`${prefixCls}-tree-title`}>
// 				<span
// 					onClick={() => {
// 						onSelect(data)
// 					}}
// 					className={selected ? `${prefixCls}-tree-selected` : ''}
// 				>
// 					{title}
// 				</span>
// 			</span>
// 		</div>
// 	)
// }

// export default React.memo(TreeNode)
