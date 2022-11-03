export type TSourceTreeItemData = {
	id: number
	value: string | number
	label: string
	pid: number | null
	open: boolean
	children: Array<TSourceTreeItemData>
}
