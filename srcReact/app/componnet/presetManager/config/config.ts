import { TPresetManagerProps } from '../types/types'

export const defaultProfile: TPresetManagerProps = {
	fixedList: [],
	floatList: [],
	initSelectedValue: undefined as any,
	saveBtnDisabled: true,
	saveBtnTitle: 'Save',
	saveAsBtnDisabled: true,
	saveAsbtnTitle: 'Save As...',
	renameBtnDisabled: true,
	renameBtnTitle: `Rename`,
	deleteBtnDisabled: true,
	deleteBtnTitle: `Delete`,
}

export enum EPresetManagerActionTag {
	SAVE = 'SAVE',
	SAVE_AS = 'SAVE_AS',
	RENAME = 'RENAME',
	DELETE = 'DELETE',
}

export const VIEWPORT_PADDING: number = 10
export const VERTICAL_GAP: number = 1
