import { TTreeRootPorps } from '../types/types'

export const LEVEL_KEY_PREFIX: string = 'tree-expand-'
export const ROW_ID_PREFIX: string = 'tree-rowdata-'

/**
 * 默认配置
 */
export const defaultProfile: TTreeRootPorps = {
	containerClassName: '',
	containerStyleObject: {},
	data: [],
	treeTipsLineWidth: '30px',
	itemStyleObject: {},
	showTagLine: true,
	showExpandBtn: true,
	expandAll: false,
	onExpand: null,
	onClick: null,
	itemRender: null,
}

/**
 * 用于标记每一行的用户控件类型及控件数量
 * 		按钮
 *      指示线
 */
export enum ELEVEL_STAG {
	TYPE_BLANK = -1,
	TYPE_EXTEND_BTN = 0,
	TYPE_VERTICAL_LINE = 1,
	TYPE_HORIZONTAL_LINE = 2,
	TYPE_TURNING_LINE = 3,
	TYPE_CROSS_LINE = 4,
}
