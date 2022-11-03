import React, { useState, useEffect } from 'react'
import { TSourceTreeItemData } from './config/types'
import './style/tree.less'

function ReactTree(props: any): React.ReactElement {
	const { sourceTreeData, treeElementClickedCallback } = props
	const [treeData, setTreeData] = useState<Array<TSourceTreeItemData>>(sourceTreeData)
	const [selectedItemData, setSelectedValueItemData] = useState<TSourceTreeItemData>(undefined as unknown as TSourceTreeItemData)

	const openTreeFolder = (e: React.MouseEvent, itemData: TSourceTreeItemData): void => {
		debugger
		e.preventDefault()
		itemData.open = !itemData.open
	}
	const selectTreeElementItem = (e: React.MouseEvent, itemData: TSourceTreeItemData): void => {
		e.preventDefault()
		setSelectedValueItemData(itemData)
	}

	useEffect((): void => {
		treeElementClickedCallback && treeElementClickedCallback(selectedItemData)
	}, [selectedItemData])

	const renderChildrenTreeElement = (children: Array<TSourceTreeItemData>): Array<React.ReactElement> => {
		return children.map((childItem: TSourceTreeItemData, index: number): React.ReactElement => {
			const childContainerClassName: string = `child-element ${childItem.open ? 'open' : 'close'} ${
				childItem.children && childItem.children.length ? '' : 'last-child-element'
			}`
			const childItemTitleClassName: string = `element-label ${selectedItemData && selectedItemData.value === childItem.value ? 'active' : ''}`
			return (
				<div key={index} className={childContainerClassName}>
					<span onClick={e => openTreeFolder(e, childItem)} className="open-toggle-btn"></span>
					{index === children.length - 1 ? <span className="end-element-line"></span> : null}
					<div className={childItemTitleClassName} onClick={e => selectTreeElementItem(e, childItem)}>
						{childItem.label}
					</div>
					{childItem.children ? <div className="children-wrapper">{renderChildrenTreeElement(childItem.children)}</div> : null}
				</div>
			)
		})
	}

	return (
		<div className="tree-section">
			<div className="children-wrapper">{renderChildrenTreeElement(treeData)}</div>
		</div>
	)
}

export default ReactTree
