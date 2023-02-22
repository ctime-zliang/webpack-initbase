import { EContextMenuType } from '../config/enum'

export type TContextMenuItem = {
	title?: string | React.ReactElement
	type?: EContextMenuType
	cmd?: string
	disabled?: boolean
	subMenu?: Array<TContextMenuItem>
	checked?: boolean
	isHideChecked?: boolean
	tips?: string
	isHideTips?: boolean
	isHideExt?: boolean
	isSetContentHtml?: boolean
	isSetContentJSX?: boolean
	data?: any
}

export type TContextMenuItemExtend = TContextMenuItem & {
	cmdlink?: string
}

export type TContextMenu = {
	data: Array<TContextMenuItem>
	position: TPosition
	onClick?: (menuItem: TContextMenuItemExtend, e: React.MouseEvent) => void
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
	menuItem: TContextMenuItem
}

export type TContextMenuItemProps = {
	nowMenuItem: TContextMenuItem
	isCreateSubMenu: boolean
	commanLink?: string
	createSubMenu?: (a: TMenuWrapperProps) => React.ReactElement
	onClickAction?: (a: TContextMenuItemExtend, e: React.MouseEvent) => void
}

export type TMenuWrapperProps = {
	commanLink?: string
	subMenuItems?: Array<TContextMenuItem>
	onClickAction?: (a: TContextMenuItemExtend, e: React.MouseEvent) => void
	isSubMenu?: boolean
}

export type TContextMenuItemContentProps = TContextMenuItem
