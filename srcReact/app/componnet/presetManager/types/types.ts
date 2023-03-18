import { EPresetManagerActionTag } from '../config/config'

export type TPresetManager = {
	fixedList: Array<DataItem>
	floatList: Array<DataItem>
	initSelectedValue: string
	saveBtnDisabled?: boolean
	saveBtnTitle?: string
	renameBtnDisabled?: boolean
	renameBtnTitle?: string
	saveAsBtnDisabled?: boolean
	saveAsbtnTitle?: string
	deleteBtnDisabled?: boolean
	deleteBtnTitle?: string
	onTogglePresetSelected?: (v: string) => void
	onActionTagClicked?: (a: EPresetManagerActionTag) => void
}

export type TPresetManagerDataItem = DataItem

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

export type DataItem = {
	title: string
	value: string
	disabled: boolean
}

export type TBoundingClientRectResultToJSONResult = {
	left: number
	top: number
	right: number
	bottom: number
	width: number
	height: number
	x: number
	y: number
}

export type TPresetManagerProps = TPresetManager

export type TPresetListProps = {
	fixedList: Array<DataItem>
	floatList: Array<DataItem>
	saveBtnDisabled: boolean
	saveBtnTitle: string
	renameBtnDisabled: boolean
	renameBtnTitle: string
	saveAsBtnDisabled: boolean
	saveAsbtnTitle: string
	deleteBtnDisabled: boolean
	deleteBtnTitle: string
	setListComponentHidden: () => void
	setStaticShowText: (a: string | ((a: string) => string)) => void
	onTogglePresetSelected?: (v: string) => void
	onActionTagClicked?: (a: EPresetManagerActionTag) => void
}
