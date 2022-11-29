import React from 'react'
import { classNames } from '../../utils/classNames'
import { ELEVEL_STAG } from '../config/config'
import { TLevels, TLineComponentProps } from '../types/types'

function TreeLine(props: TLineComponentProps): React.ReactElement {
	const { lineKey, lineData, selectedKeys, profile, expandAction, contentClickAction } = props
	const { levels = [], expand, sourceData } = lineData
	const { leftTranslationalAlignment = false, itemStyleObject, showTagLine = true, showExpandBtn = true, contentUnderline, itemRender } = profile
	const treeContentClassString = classNames({
		'tree-content': true,
		'tree-content-selected': selectedKeys.indexOf(sourceData.id) >= 0,
		'tree-content-underline': !!contentUnderline,
	})
	const blankWrapperClassName: string = 'tree-blank'
	const extenBtnWrapperClassName: string = 'tree-extends'
	const expandRenderClass = classNames({
		'tree-extends-box': true,
		'tree-extends-box-active': !!expand,
	})
	const extendLineClassName: string = 'tree-usertips-line'
	const extendLineMiddleClassName: string = 'tree-usertips-line-middle'
	const extendLineTurnClassName: string = 'tree-usertips-line-turn'
	const extendLineForkClassName: string = 'tree-usertips-line-fork'
	const viewComponent: Array<React.ReactElement> = []
	const expandContainer = <div className={expandRenderClass} onClick={() => expandAction && expandAction(lineData)}></div>
	levels.forEach((levelItem: TLevels, index: number): void => {
		switch (levelItem.stag) {
			case ELEVEL_STAG.TYPE_BLANK: {
				if (!!leftTranslationalAlignment && index === 0) {
					viewComponent.push(<span key={levelItem.key}></span>)
					return
				}
				viewComponent.push(<span key={levelItem.key} className={blankWrapperClassName}></span>)
				return
			}
			case ELEVEL_STAG.TYPE_EXTEND_BTN: {
				if (!showExpandBtn) {
					viewComponent.push(<span key={levelItem.key} className={blankWrapperClassName}></span>)
					return
				}
				viewComponent.push(
					<span key={levelItem.key} className={extenBtnWrapperClassName}>
						{expandContainer}
					</span>
				)
				return
			}
			case ELEVEL_STAG.TYPE_VERTICAL_LINE: {
				if (!showTagLine) {
					viewComponent.push(<span key={levelItem.key} className={blankWrapperClassName}></span>)
					return
				}
				viewComponent.push(<span key={levelItem.key} className={extendLineClassName}></span>)
				return
			}
			case ELEVEL_STAG.TYPE_HORIZONTAL_LINE: {
				if (!showTagLine) {
					viewComponent.push(<span key={levelItem.key} className={blankWrapperClassName}></span>)
					return
				}
				viewComponent.push(<span key={levelItem.key} className={extendLineMiddleClassName}></span>)
				return
			}
			case ELEVEL_STAG.TYPE_TURNING_LINE: {
				if (!showTagLine) {
					viewComponent.push(<span key={levelItem.key} className={blankWrapperClassName}></span>)
					return
				}
				viewComponent.push(<span key={levelItem.key} className={extendLineTurnClassName}></span>)
				return
			}
			case ELEVEL_STAG.TYPE_CROSS_LINE: {
				if (!showTagLine) {
					viewComponent.push(<span key={levelItem.key} className={blankWrapperClassName}></span>)
					return
				}
				viewComponent.push(<span key={levelItem.key} className={extendLineForkClassName}></span>)
				return
			}
			default: {
				viewComponent.push(<span key={levelItem.key} className={blankWrapperClassName}></span>)
				return
			}
		}
	})
	viewComponent.push(
		<span key={lineKey} className={treeContentClassString} style={itemStyleObject} onClick={() => contentClickAction(lineData)}>
			{itemRender ? itemRender(sourceData, lineData) : sourceData.title}
		</span>
	)
	return <>{viewComponent}</>
}

export default TreeLine
