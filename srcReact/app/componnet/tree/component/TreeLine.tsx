import React from 'react'
import { ELEVEL_STAG } from '../config/config'
import { TComponentTreeRowData, TLevels } from '../types/types'
import { classNames } from '../utils/classNames'

export type TLineComponentProps = {
	lineData: TComponentTreeRowData
	showTagLine?: boolean
	showExpandBtn?: boolean
	expandAction?: ((a: any) => void) | null
}

function TreeLine(props: TLineComponentProps): Array<React.ReactElement> {
	const { lineData, showTagLine = true, showExpandBtn = true, expandAction = null } = props
	const { levels = [], expand } = lineData
	/**
	 * Tree 行展开/收起按钮包裹层样式类
	 */
	const extenBtnWrapperClassName: string = 'tree-extends'
	const expandRenderClass = classNames({
		['tree-extends-box']: true,
		[`tree-extends-box-active`]: !!expand,
	})
	const extendLineClassName: string = 'tree-usertips-line'
	const extendLineMiddleClassName: string = 'tree-usertips-line-middle'
	const extendLineTurnClassName: string = 'tree-usertips-line-turn'
	const extendLineForkClassName: string = 'tree-usertips-line-fork'
	const viewComponent: Array<React.ReactElement> = []
	const expandContainer = <div className={expandRenderClass} onClick={() => expandAction && expandAction(lineData)}></div>
	;(levels as Array<TLevels>).forEach((levelItem: TLevels): void => {
		/**
		 * 不展示连接线
		 * 只展示收起/展开按钮
		 */
		if (!showTagLine && showExpandBtn) {
			if (levelItem.stag === 0) {
				viewComponent.push(
					<span key={levelItem.key} className={extenBtnWrapperClassName}>
						{expandContainer}
					</span>
				)
				return
			}
			viewComponent.push(<span key={levelItem.key} className={extenBtnWrapperClassName}></span>)
			return
		}
		/**
		 * 不展示连接线
		 * 不展示收起/展开按钮
		 */
		if (!showTagLine) {
			viewComponent.push(<span key={levelItem.key} className={extenBtnWrapperClassName}></span>)
			return
		}
		/**
		 * 展示连接线
		 * 展示收起/展开按钮
		 */
		switch (levelItem.stag) {
			case ELEVEL_STAG.TYPE_BLANK: {
				/**
				 * 空白视图
				 */
				viewComponent.push(<span key={levelItem.key} className={extenBtnWrapperClassName}></span>)
				return
			}
			case ELEVEL_STAG.TYPE_EXTEND_BTN: {
				/**
				 * 收起/展开按钮
				 */
				viewComponent.push(
					<span key={levelItem.key} className={extenBtnWrapperClassName}>
						{expandContainer}
					</span>
				)
				return
			}
			case ELEVEL_STAG.TYPE_VERTICAL_LINE: {
				/**
				 * 竖线
				 */
				viewComponent.push(<span key={levelItem.key} className={extendLineClassName}></span>)
				return
			}
			case ELEVEL_STAG.TYPE_HORIZONTAL_LINE: {
				/**
				 * 横线
				 */
				viewComponent.push(<span key={levelItem.key} className={extendLineMiddleClassName}></span>)
				return
			}
			case ELEVEL_STAG.TYPE_TURNING_LINE: {
				/**
				 * 转折线
				 */
				viewComponent.push(<span key={levelItem.key} className={extendLineTurnClassName}></span>)
				return
			}
			case ELEVEL_STAG.TYPE_CROSS_LINE: {
				/**
				 * 交叉线
				 */
				viewComponent.push(<span key={levelItem.key} className={extendLineForkClassName}></span>)
				return
			}
			default: {
				/**
				 * 空白视图
				 */
				viewComponent.push(<span key={levelItem.key}></span>)
				return
			}
		}
	})
	return viewComponent
}

export default TreeLine
