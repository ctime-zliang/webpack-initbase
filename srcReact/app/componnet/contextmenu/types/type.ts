import { EContextMenuType } from '../config/enum'

export type TMenuItem = {
	title?: string
	type?: EContextMenuType
	cmd?: string
	disabled?: boolean
	subMenu?: Array<TMenuItem>
	checked?: boolean
	isHideChecked?: boolean
	tips?: string
	isHideTips?: boolean
	isSetContentHtml?: boolean
	isSetContentJSX?: boolean
	data?: any
}

export type TMenuItemExtend = TMenuItem & {
	cmdlink?: string
}

export type TContextMenu = {
	data: Array<TMenuItem>
	position: TPosition
	onClick?: (menuItem: TMenuItemExtend, e: React.MouseEvent) => void
}

export type TOpenContextMenu = TContextMenu

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

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

export type TPosition = {
	x: number
	y: number
}

export type TContextMenuRootProps = TContextMenu & {
	unmount: () => void
}

export type TSeparatorProps = {
	menuItem: TMenuItem
}

export type TMenuItemProps = {
	nowMenuItem: TMenuItem
	isCreateSubMenu: boolean
	commanLink?: string
	createSubMenu?: (a: TMenuWrapperProps) => React.ReactElement
	onClickAction?: (a: TMenuItemExtend, e: React.MouseEvent) => void
}

export type TMenuWrapperProps = {
	commanLink?: string
	subMenuItems?: Array<TMenuItem>
	onClickAction?: (a: TMenuItemExtend, e: React.MouseEvent) => void
	isSubMenu?: boolean
}

export type TMenuItemContentProps = TMenuItem
