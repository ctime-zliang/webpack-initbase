import React, { useEffect, useState } from 'react'

// export enum CheckedType {
//     ALL_CHECKED = 'ALL_CHECKED',
//     NOT_CHECKED = 'NOT_CHECKED',
//     INDETERMINATE_CHECKED = 'INDETERMINATE_CHECKED '
// }

// class Tree extends React.PureComponent<TreeProps, TreeState> {
//     constructor(props: TreeProps) {
//       super(props);
//       // step1: 读取props 中的所有相关计算的参数

//       // step2: 如果外部传入了参数，应该赋值
//       let currentExpandKeys = getDefaultKeys(expandedKeys, defaultExpandedKeys);
//       let currentSelectedKeys = getDefaultKeys(selectedKeys, defaultSelectedKeys);

//       // step3: 平铺数据
//       const { treeItems, currentCheckedKeys, indeterminateKeys } = flatten(....一系列参数);

//       this.state = {
//         treeData, // 存放外部props传入的treeData
//         currentExpandKeys, // 存放当前打开的节点
//         showItems: getShowItems(treeItems), // 存放目前列表中显示的项

//         treeItems, // 平铺节点list
//         currentCheckedKeys, // 当前被选中的项
//         currentSelectedKeys, // 计算出来的 当前select项
//         indeterminateKeys, // 半选状态下的key
//       };
//     }

//     toggleExpand = (treeItem: TreeItem) => {
//         const { onExpand } = this.props;
//         let { showItems, currentExpandKeys, treeItems } = toggleExpand(treeItem, [...this.state.treeItems], [...this.state.currentExpandKeys], !treeItem.expand);
//         this.setState({ treeItems, showItems, currentExpandKeys });
//         onExpand && onExpand(currentExpandKeys);
//       }

//       toogleChecked = (item: TreeItem) => {
//         const { onCheck } = this.props;
//         let {
//           showItems,
//           treeItems,
//           checked,
//           currentCheckedKeys,
//           indeterminateKeys
//         } = toogleChecked([...this.state.treeItems], { ...item }, [...this.state.currentCheckedKeys], [...this.state.indeterminateKeys]);

//         this.setState({
//           treeItems,
//           showItems,
//           currentCheckedKeys,
//           indeterminateKeys,
//         });
//         onCheck && onCheck(currentCheckedKeys, { checked: checked === CheckedType.ALL_CHECKED, indeterminateKeys })
//       }

//       onSelect = (item: TreeItem) => {
//         const { onSelect, multiple } = this.props;
//         let {
//           treeItems,
//           currentSelectedKeys,
//           showItems,
//           selected,
//         } = toogleSelect([...this.state.treeItems], { ...item }, [...this.state.currentSelectedKeys], multiple);

//         // 更改item和showItem
//         this.setState({
//           treeItems,
//           showItems,
//           currentSelectedKeys,
//         });
//         onSelect && onSelect(currentSelectedKeys, { selected });
//       }

//     render() {
//         const { showItems } = this.state;
//         const { isVirtual, draggable, prefixCls, checkStrictly, checkable, showLine, className, switcherIconDown, switcherIconUp } = this.props;

//         // 将其作为参数，传入到virtual list中（用以具体itemRender使用）
//         let extrea = {
//           prefixCls,
//           checkable,
//           showLine,
//           toggleExpand: this.toggleExpand,
//           toogleChecked: checkStrictly ? this.checkStrictlyToggleExpand: this.toogleChecked,
//           onSelect: this.onSelect,
//           switcherIconDown: switcherIconDown,
//           switcherIconUp: switcherIconUp,
//         };

//         return (
//           <div
//             className={className}
//           >
//             {
//               showItems.map((item: TreeItem) => {
// 				return (
// 				  <TreeNode
// 					key={item.key}
// 					data={item}
// 					{
// 					  ...extrea
// 					}
// 				  />
// 				)
// 			}
// 			)
//             }
//           </div>
//         );
//       }
//   }
