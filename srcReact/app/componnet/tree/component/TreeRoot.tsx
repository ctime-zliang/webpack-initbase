import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import '../styles/index.less'
import TreeLine from './TreeLine'
import { TComponentTreeRowData, TTreeDataItemID, TTreeRootPorps } from '../types/types'
import { handleFormatData } from '../utils/filter'
import { defaultProfile } from '../config/config'

function TreeRoot(props: TTreeRootPorps, ref: any): React.ReactElement {
	const globalProfile: TTreeRootPorps = { ...defaultProfile, ...props }
	const {
		data,
		containerStyleObject,
		treeWidgetItemWidth,
		leftTranslationalAlignment,
		multiSelect,
		selectedIds = [],
		expandAll,
		itemHeight,
		onExpand,
		onClick,
	} = globalProfile
	const containerRef = useRef<HTMLDivElement>(null)
	const expandedKeys = useRef<Array<string>>([])
	const [selectedKeys, setSelectedKeys] = useState<Array<TTreeDataItemID>>(selectedIds)
	const [viewData, setViewData] = useState<Array<TComponentTreeRowData>>([])

	const treeContainerClassString: string = `tree-container ${leftTranslationalAlignment ? 'tree-container-leftalignment' : ''}`
	const treeRowlineClassString: string = 'tree-rowline'
	const treeRowlineStyleObject: { [key: string]: any } = {
		lineHeight: itemHeight,
	}

	useImperativeHandle(ref, () => {
		return {
			test() {
				console.log(arguments)
			},
		}
	})

	useEffect((): void => {
		const handleData: Array<TComponentTreeRowData> = handleFormatData(data, [], expandedKeys.current, expandAll)
		console.log(handleData)
		setViewData(handleData)
	}, [data])

	useEffect((): void => {
		if (containerRef.current) {
			treeWidgetItemWidth && containerRef.current.style.setProperty('--tree-widget-item-width', treeWidgetItemWidth)
		}
	}, [viewData.length])

	const clickTreeItemAction = (lineData: TComponentTreeRowData): void => {
		const sourceId: TTreeDataItemID = lineData.sourceData.id
		let newSelectIds: Array<TTreeDataItemID> = []
		if (multiSelect) {
			const has: number = selectedKeys.indexOf(sourceId)
			if (has <= -1) {
				newSelectIds = [...selectedKeys, sourceId]
			} else {
				newSelectIds = selectedKeys.filter((item: TTreeDataItemID): boolean => {
					return item !== sourceId
				})
			}
		} else {
			newSelectIds = [lineData.sourceData.id]
		}
		setSelectedKeys(newSelectIds)
		onClick && onClick(newSelectIds, lineData.sourceData, lineData)
	}

	const handleExpand = (data: TComponentTreeRowData): void => {
		let result: Array<string> = []
		if (data.expand) {
			result = [...expandedKeys.current, data.id as string]
			expandedKeys.current = result
		} else {
			const delIndex: number = expandedKeys.current.indexOf(data.id as string)
			expandedKeys.current.splice(delIndex, 1)
			result = [...expandedKeys.current]
			expandedKeys.current = result
		}
		onExpand && onExpand(data.sourceData, data)
	}

	const expandAction = (data: TComponentTreeRowData): void => {
		const { expand } = data
		data.expand = !expand
		handleExpand(data)
		setViewData([...viewData])
	}

	const treeRowRender = (data: Array<TComponentTreeRowData>): Array<React.ReactElement> => {
		return data.map((lineData: TComponentTreeRowData, index: number): any => {
			const { id, children, expand, isLeaf } = lineData
			const showchildren: boolean = !!(expand && !isLeaf && children?.length)
			return [
				<div key={id} className={treeRowlineClassString} style={treeRowlineStyleObject}>
					<TreeLine
						lineKey={index}
						lineData={lineData}
						profile={globalProfile}
						selectedKeys={selectedKeys}
						contentClickAction={clickTreeItemAction}
						expandAction={expandAction}
					/>
				</div>,
				showchildren ? treeRowRender(children as Array<TComponentTreeRowData>) : (null as unknown as React.ReactElement),
			]
		})
	}
	if (viewData.length) {
		/**
		 * flat(Infinity) 性能问题
		 */
		const getFlatedNodeList: Array<React.ReactElement> = treeRowRender(viewData)
			.flat(Infinity)
			.filter((item: React.ReactElement): boolean => {
				return !!item
			})
		return (
			<section className={treeContainerClassString} style={containerStyleObject} ref={containerRef}>
				{getFlatedNodeList}
			</section>
		)
	}
	return null as unknown as React.ReactElement
}

export default forwardRef(TreeRoot)
