import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import '../styles/index.less'
import TreeLine from './TreeLine'
import { classNames } from '../utils/classNames'
import { TComponentTreeRowData, TTreeRootPorps } from '../types/types'
import { handleFormatData } from '../utils/filter'
import { defaultProfile } from '../config/config'

function TreeRoot(props: TTreeRootPorps, ref: any): React.ReactElement {
	const globalProfile = useRef<TTreeRootPorps>({ ...defaultProfile, ...props })
	const {
		data,
		containerStyleObject,
		containerClassName,
		treeTipsLineWidth,
		showTagLine,
		showExpandBtn,
		itemStyleObject,
		onExpand,
		onClick,
		itemRender,
	} = globalProfile.current
	const containerRef = useRef<HTMLDivElement>(null)
	const expandedKeys = useRef<Array<string>>([])
	const [viewData, setViewData] = useState<Array<TComponentTreeRowData>>([])

	/**
	 * Tree 组件容器样式类
	 * 		参数混合处理
	 */
	const TreeContainerClassString: string = classNames({
		['tree-container']: true,
		[containerClassName as string]: !!containerClassName,
	})
	/**
	 * Tree 行样式类
	 */
	const treeRowlineClassString: string = 'tree-rowline'
	/**
	 * Tree 行内容样式类
	 */
	const treeContentClassString: string = 'tree-content'

	useImperativeHandle(ref, () => {
		return {
			test() {
				console.log(arguments)
			},
		}
	})

	useEffect((): void => {
		const handleData: Array<TComponentTreeRowData> = handleFormatData(data, [], expandedKeys.current, false)
		console.log(handleData)
		setViewData(handleData)
	}, [data])

	useEffect((): void => {
		if (containerRef.current) {
			treeTipsLineWidth && containerRef.current.style.setProperty('--tree-usertips-line-width', treeTipsLineWidth)
		}
	}, [viewData.length])

	const clickTreeItemAction = (lineData: TComponentTreeRowData): void => {
		onClick && onClick(lineData.sourceData, lineData)
	}

	const getExpand = (data: TComponentTreeRowData): void => {
		let result: Array<string> = []
		if (data.expand) {
			/**
			 * 展开当前行的子层时
			 * 		记录当前行的 level-key
			 */
			result = [...expandedKeys.current, data.id as string]
			expandedKeys.current = result
		} else {
			const delIndex: number = expandedKeys.current.indexOf(data.id as string)
			/**
			 * 收起当前行的子层时
			 * 		删除当前行的 level-key
			 */
			expandedKeys.current.splice(delIndex, 1)
			result = [...expandedKeys.current]
			expandedKeys.current = result
		}
		onExpand && onExpand(data.sourceData, data)
	}

	const expandAction = (data: TComponentTreeRowData): void => {
		const { expand } = data
		data.expand = !expand
		getExpand(data)
		setViewData([...viewData])
	}

	const treeRowRender = (data: Array<TComponentTreeRowData>): Array<React.ReactElement> => {
		return data.map((lineData: TComponentTreeRowData, index: number): any => {
			const { id, children, expand, isLeaf, sourceData } = lineData
			const showchildren: boolean = !!(expand && !isLeaf && children?.length)
			return [
				<div key={id} className={treeRowlineClassString}>
					{TreeLine({
						lineData,
						showTagLine,
						showExpandBtn,
						expandAction,
					})}
					<span className={treeContentClassString} style={itemStyleObject} onClick={() => clickTreeItemAction(lineData)}>
						{itemRender ? itemRender(sourceData, lineData) : sourceData.title}
					</span>
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
			<section className={TreeContainerClassString} style={containerStyleObject} ref={containerRef}>
				{getFlatedNodeList}
			</section>
		)
	}
	return null as unknown as React.ReactElement
}

export default forwardRef(TreeRoot)
