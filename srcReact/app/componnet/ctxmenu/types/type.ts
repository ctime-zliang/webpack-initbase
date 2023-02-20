export type TMenuItem = {
	type: string
	title?: string
	cmd?: string
	disabled?: boolean
	subMenu?: Array<TMenuItem>
}

export type TContextMenu = {
	data: Array<TMenuItem>
	position: TPosition
	onClick?: (menuItem: TMenuItem, e: React.MouseEvent) => void
}

export type TOpenContextMenuParams = TContextMenu

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
	createSubMenu?: (a: TMenuWrapperProps) => React.ReactElement
	onClickAction?: (a: TMenuItem, e: React.MouseEvent) => void
}

export type TMenuWrapperProps = {
	subMenuItems?: Array<TMenuItem>
	onClickAction?: (a: TMenuItem, e: React.MouseEvent) => void
	isSubMenu?: boolean
}
