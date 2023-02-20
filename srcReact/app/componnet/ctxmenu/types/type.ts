export type TMenuItem = {
	type: string
	title?: string
	cmd?: string
	disabled?: boolean
	subMenu?: Array<TMenuItem>
}

export type TMenu = {
	visible: boolean
	position: TPosition
	data: Array<TMenuItem>
	hideMenu?: () => void
	onClick?: (menuItem: any) => void
}

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

export type TContextMenuRootProps = TMenu

export type TSeparatorProps = {
	menuItem: TMenuItem
}

export type TMenuItemProps = {
	nowMenuItem: TMenuItem
	isCreateSubMenu: boolean
	createSubMenu?: (a: TMenuWrapperProps) => React.ReactElement
	onClick?: (e: React.MouseEvent) => void
}

export type TMenuWrapperProps = {
	subMenuItems?: Array<TMenuItem>
	onClick?: (e: React.MouseEvent) => void
	isSubMenu?: boolean
}
