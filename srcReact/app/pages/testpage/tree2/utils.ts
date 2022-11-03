export const a = 1
//  * 用于将传入的数组（children结构）修改为平级的
//  * @param treeData // origin 数据，需要被展开的数据
//  * @param treeItems // 存放展开的数据
//  * @param expandedKeys // expand需要为true的节点
//  * @param currentCheckedKeys // 当前状态为选中的key集合（计算结果）
//  * @param indeterminateKeys // 状态为半选的key集合
//  * @param checkedKeys // 默认选中的key
//  * @param deep // 节点层级
//  * @param parentId // 节点parent
//  * @param visible // 节点是否可见
//  * @param isLastSiblingCollection 从祖先算起，是最后一个节点的集合
//  * @param checkStrictly: checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
//  * @param selectedKeys: 节点Label是否被选中
//  */
// export const flatten = (
// 	treeData: Array<TreeItem> = [],
// 	treeItems: Array<TreeItem> = [],
// 	currentCheckedKeys: Array<string | number> = [],
// 	indeterminateKeys: Array<string | number> = [],
// 	expandedKeys: Array<string | number> = [],
// 	checkedKeys: Array<string | number> = [],
// 	deep: number = 0,
// 	parentId: string | number = undefined,
// 	visible: boolean = false,
// 	isLastSiblingCollection: Array<number> = [],
// 	checkStrictly: boolean = false,
// 	selectedKeys: Array<string | number> = []
// ) => {
// 	treeData.map(({ children, ...item }: TreeItem, index: number) => {
// 		let hasChild = children?.length > 0

// 		// 1： 处理节点状态
// 		// 1.1： expand 是否展开， selected 表示label是否选中
// 		let expand = expandedKeys.includes(item.key),
// 			selected = selectedKeys.includes(item.key),
// 			checked

// 		// 1.2：复选框是否选中
// 		if (checkStrictly) {
// 			checked = checkedKeys.includes(item.key) ? CheckedType.ALL_CHECKED : CheckedType.NOT_CHECKED
// 		} else {
// 			checked = isNull(item.checked) ? getDefaultChecked(children, item.key, checkedKeys) : item.checked
// 		}

// 		// 2. 生成一个新的平铺节点元素，放入 treeItems
// 		treeItems.push({
// 			...item, // 传入值的属性
// 			isLeaf: !hasChild, // 是否是最后一个叶子节点
// 			deep, // 节点的层次
// 			expand, // 状态是否展开
// 			parentId,
// 			visible, // 显示状态（显示或隐藏）
// 			listIndex: treeItems.length, // 平铺后，该节点存放在treeItems里的索引
// 			isLastSiblingCollection,
// 			checked,
// 			selected,
// 			children,
// 		})

// 		// 3. 处理 全选半选节点
// 		checked === CheckedType.ALL_CHECKED && currentCheckedKeys.push(item.key)
// 		checked === CheckedType.INDETERMINATE_CHECKED && indeterminateKeys.push(item.key)

// 		// 4. 递归处理， 有child节点，且默认需要展开
// 		if (hasChild) {
// 			// 4.1: 处理 deep
// 			let childDeep = deep + 1

// 			// 4.2: 下一个兄弟节点是否存在: 不存在时，放入isLastSiblingCollection,用于隐藏左侧line
// 			isLastSiblingCollection = !treeData[index + 1] ? isLastSiblingCollection.concat(deep) : isLastSiblingCollection

// 			// 4.3: 递归调用处理
// 			flatten(children, treeItems, currentCheckedKeys, indeterminateKeys, expandedKeys, checkedKeys, childDeep, item.key, expand, [
// 				...isLastSiblingCollection,
// 			])
// 		}
// 	})

// 	return {
// 		treeItems,
// 		currentCheckedKeys,
// 		indeterminateKeys,
// 	}
// }

// const getDefaultChecked = (children: Array<TreeItem>, key: string | number, checkedKeys: Array<string | number>) => {
// 	// 如果key 输入外部输入默认选中的，那么child也需要全选。
// 	if (checkedKeys.includes(key)) {
// 		setChildrenChecked(children)
// 		return CheckedType.ALL_CHECKED
// 	}

// 	// 不存在，则需要判断子孙节点，是否存在选中的，有返回半选状态，没有返回not check
// 	let count = 0,
// 		keys = getChildrenKeys(children, [])
// 	for (let i = 0; i < keys.length; i++) {
// 		if (checkedKeys.includes(keys[i])) {
// 			count++
// 		}
// 	}

// 	let checkStatus = count === 0 ? CheckedType.NOT_CHECKED : count === keys.length ? CheckedType.ALL_CHECKED : CheckedType.INDETERMINATE_CHECKED
// 	return checkStatus
// }

// // 获取所有子孙节点key
// const getChildrenKeys = (children: Array<TreeItem>, keys: Array<number | string>) => {
// 	children?.map(item => {
// 		keys.push(item.key)
// 		if (item.children) {
// 			getChildrenKeys(item.children, keys)
// 		}
// 	})
// 	return keys
// }

// // 设置child状态为选中
// const setChildrenChecked = (children: Array<TreeItem>) => {
// 	children?.map(item => {
// 		item.checked = CheckedType.ALL_CHECKED
// 		item.children && setChildrenChecked(item.children)
// 	})
// }

// /**
//  * 获取最终呈现在列表中的数据集合
//  *
//  * @param treeItems 平铺数据集合（所有）
//  * @returns showData:显示的列表集合
//  */
// export const getShowItems = (treeItems: Array<TreeItem>) => {
// 	// 获取所有visible为true的集合
// 	let visibleData = treeItems.filter(item => item.visible)

// 	let showData = [], //存放显示列表
// 		i = 0

// 	// 如果父节点是未展开状态， 子节点的visible即使为true,也应该被跳过
// 	while (i < visibleData.length) {
// 		let item = visibleData[i]
// 		showData.push(item)
// 		if (!item.expand) {
// 			i = searchSiblingIndex(visibleData, i, item.deep).siblingIndex
// 			continue
// 		}
// 		i++
// 	}

// 	return showData
// }

// /**
//  * 查找相临近的兄弟节点
//  *
//  * @param dataset 平铺数据列表
//  * @param beginIndex 查找与该节点deep相同的兄弟节点的索引
//  * @param deep deep的值
//  */
// export const searchSiblingIndex = (dataset: Array<TreeItem>, beginIndex: number, deep: number) => {
// 	let siblingIndex = undefined // 兄弟节点或 下一个父节点的兄弟节点
// 	let hasNextSibling = false // 是否有兄弟节点
// 	for (let i = beginIndex + 1; i < dataset.length; i++) {
// 		// dataset[i].deep === deep: 自己的兄弟节点
// 		// dataset[i].deep < deep: 自己已经同层级最后一个节点，返回父级兄弟节点index
// 		if (dataset[i].deep <= deep) {
// 			hasNextSibling = dataset[i].deep === deep
// 			siblingIndex = i
// 			break
// 		}
// 	}
// 	return {
// 		siblingIndex,
// 		hasNextSibling,
// 	}
// }

// // 工具函数
// /**
//  * 点击节点 展开关闭业务逻辑
//  * @param treeItem 点击的item
//  * @param treeItems 整个列表平铺的数据
//  */
// export const toggleExpand = (treeItem: TreeItem, treeItems: Array<TreeItem>, currentExpandKeys: Array<string | number>, isExpand: boolean) => {
// 	const { key, deep, listIndex } = treeItem
// 	let length = treeItems.length

// 	// 更新点击的状态
// 	treeItems[listIndex] = { ...treeItems[listIndex], expand: isExpand }

// 	for (let i = listIndex + 1; i < length; i++) {
// 		if (treeItems[i].parentId === key) {
// 			treeItems[i] = { ...treeItems[i], visible: isExpand }
// 		}
// 		if (treeItems[i].deep === deep) {
// 			break
// 		}
// 	}
// 	let showItems = getShowItems(treeItems)

// 	// 计算该节点的状态
// 	if (isExpand) {
// 		currentExpandKeys.push(key)
// 	} else {
// 		currentExpandKeys = currentExpandKeys.filter(value => value !== key)
// 	}

// 	return { showItems, currentExpandKeys, treeItems }
// }

// // 工具函数
// export const toogleChecked = (
// 	treeItems: Array<TreeItem>,
// 	item: TreeItem,
// 	currentCheckedKeys: Array<number | string>,
// 	indeterminateKeys: Array<number | string>
// ) => {
// 	let { checked, deep, listIndex, parentId, key } = item
// 	// 点击的item 不是allChecked,就是not Checked。 half Checked是半选状态
// 	checked = checked !== CheckedType.ALL_CHECKED ? CheckedType.ALL_CHECKED : CheckedType.NOT_CHECKED
// 	treeItems[listIndex] = { ...treeItems[listIndex], checked }

// 	// 更新点击这一条的存储状态
// 	if (checked === CheckedType.ALL_CHECKED) {
// 		currentCheckedKeys.push(key)
// 	} else {
// 		currentCheckedKeys = currentCheckedKeys.filter(value => key !== value)
// 	}
// 	indeterminateKeys = indeterminateKeys.filter(value => key !== value)

// 	// 更新父节点，同步与item状态一致
// 	let retParenthange = toogleParentNode(treeItems, parentId, currentCheckedKeys, indeterminateKeys)

// 	// 更新子节点，同步与item状态一致
// 	let retChildChange = toogleChildNode(treeItems, listIndex, checked, deep, retParenthange.currentCheckedKeys, retParenthange.indeterminateKeys)

// 	return {
// 		...retChildChange,
// 		checked,
// 		showItems: getShowItems(treeItems),
// 	}
// }

// const toogleParentNode = (
// 	treeItems: Array<TreeItem>,
// 	parentId: string | number,
// 	currentCheckedKeys: Array<number | string>,
// 	indeterminateKeys: Array<number | string>
// ): {
// 	currentCheckedKeys: Array<number | string>
// 	indeterminateKeys: Array<number | string>
// 	treeItems: Array<TreeItem>
// } => {
// 	if (!isNull(parentId)) {
// 		let parentNodeIndex = treeItems.findIndex(item => item.key === parentId)
// 		let siblings = treeItems.filter(item => item.parentId === parentId)

// 		// 根据子节点，计算parentNode的状态
// 		let checked = nodeCheckedStatus(siblings)
// 		treeItems[parentNodeIndex] = { ...treeItems[parentNodeIndex], checked }

// 		// 计算全选中 / 半选状态, 更新checkedKeys， indeterminateKeys
// 		let { key } = treeItems[parentNodeIndex]

// 		if (checked === CheckedType.ALL_CHECKED) {
// 			currentCheckedKeys.push(key)
// 			indeterminateKeys = indeterminateKeys.filter(k => key !== k)
// 		} else if (checked === CheckedType.INDETERMINATE_CHECKED) {
// 			!indeterminateKeys.includes(key) && indeterminateKeys.push(key)
// 			currentCheckedKeys = currentCheckedKeys.filter(k => k !== key)
// 		} else {
// 			currentCheckedKeys = currentCheckedKeys.filter(k => k !== key)
// 			indeterminateKeys = indeterminateKeys.filter(k => key !== k)
// 		}

// 		// 循环处理parent,知道deep为0
// 		toogleParentNode(treeItems, treeItems[parentNodeIndex].parentId, currentCheckedKeys, indeterminateKeys)
// 	}
// 	return {
// 		treeItems,
// 		currentCheckedKeys,
// 		indeterminateKeys,
// 	}
// }

// /**
//  * 当父节点为选中，子节点全部选中。子节点取消，子节点全部取消
//  *
//  * @param treeItems 平铺数组
//  * @param index 点击节点的索引
//  * @param checked 点击节点的状态
//  * @param deep  点击节点的层级
//  */
// const toogleChildNode = (
// 	treeItems: Array<TreeItem>,
// 	index: number,
// 	checked: CheckedType,
// 	deep: number,
// 	currentCheckedKeys: Array<number | string>,
// 	indeterminateKeys: Array<number | string>
// ) => {
// 	for (let i = index + 1; i < treeItems.length; i++) {
// 		if (treeItems[i].deep <= deep) {
// 			break
// 		}
// 		treeItems[i] = { ...treeItems[i], checked }

// 		// 点击后，子节点要不全选，要么不选，更新 currentCheckedKeys
// 		let { key } = treeItems[i]
// 		if (checked === CheckedType.ALL_CHECKED) {
// 			!currentCheckedKeys.includes(key) && currentCheckedKeys.push(treeItems[i].key)
// 		} else {
// 			currentCheckedKeys = currentCheckedKeys.filter(value => key !== value)
// 		}
// 		indeterminateKeys = indeterminateKeys.filter(value => key !== value)
// 	}
// 	return {
// 		treeItems,
// 		currentCheckedKeys,
// 		indeterminateKeys,
// 	}
// }

// /**
//  * 计算子节点为sibling的check状态
//  *
//  * @param sibling 子节点集合（子孙节点）
//  */
// const nodeCheckedStatus = (sibling: Array<TreeItem>) => {
// 	let childCheckedCount = 0,
// 		checkStatus
// 	for (let i = 0; i < sibling.length; i++) {
// 		if (sibling[i].checked === CheckedType.INDETERMINATE_CHECKED) {
// 			// 只要有一个半选状态，则parent的状态就是半选
// 			checkStatus = CheckedType.INDETERMINATE_CHECKED
// 			break
// 		}
// 		if (sibling[i].checked === CheckedType.ALL_CHECKED) {
// 			childCheckedCount++
// 		}
// 	}

// 	checkStatus = checkStatus
// 		? checkStatus // 有值 直接半选
// 		: childCheckedCount === sibling.length // child全是选中，则父级选中
// 		? CheckedType.ALL_CHECKED
// 		: childCheckedCount > 0 // child未全部选中
// 		? CheckedType.INDETERMINATE_CHECKED
// 		: CheckedType.NOT_CHECKED // child未选中
// 	return checkStatus
// }

// // 工具函数
// export const toogleSelect = (treeItems: Array<TreeItem>, item: TreeItem, currentSelectedKeys: Array<number | string>, multiple: boolean) => {
// 	const { key, listIndex } = item
// 	let selected = false
// 	if (multiple) {
// 		// 可多选
// 		if (currentSelectedKeys.includes(key)) {
// 			currentSelectedKeys = currentSelectedKeys.filter(value => value !== key)
// 		} else {
// 			currentSelectedKeys.push(key)
// 			selected = true
// 		}
// 	} else {
// 		// 只能选择一个的时候
// 		let preItem = treeItems.find(item => currentSelectedKeys.includes(item.key))
// 		if (preItem) {
// 			treeItems[preItem.listIndex] = { ...preItem, selected: false }
// 		}

// 		selected = true
// 		currentSelectedKeys = [key]
// 	}
// 	treeItems[listIndex] = { ...item, selected }

// 	return {
// 		treeItems,
// 		currentSelectedKeys,
// 		showItems: getShowItems(treeItems),
// 		selected,
// 	}
// }
