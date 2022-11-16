export type TPagination = {
	/**
	 * 当前选中的页码
	 * 		首次渲染组件时读取
	 */
	pageNumber: number
	/**
	 * 条目总长度
	 */
	countTotal: number
	/**
	 * 每页条目长度
	 */
	cutSize: number
	/**
	 * 每页条目长度配置数组
	 */
	cutSizeOptions?: Array<number>
	/**
	 * 夹在两个 "..." 中间需要显示的页码按钮个数
	 *      建议设置一个奇数
	 */
	middleDisplaySize?: number
	/**
	 * 页码列表首位需要显示的页码按钮个数
	 *      不得小于 1
	 */
	sideDislpaySize?: number
	/**
	 * 切换切换时执行回调
	 */
	pageToggle?: (a: string, v: number) => void
	/**
	 * 切换每页长度时执行回调
	 */
	pagePiecewise?: (v: number) => void
}

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

export type TPaginationProfile = TPagination & {
	cutSizeOptions: Array<number>
	middleDisplaySize: number
	sideDislpaySize: number
	pageToggle?: (a: string, v: number) => void
	pagePiecewise?: (v: number) => void
}
