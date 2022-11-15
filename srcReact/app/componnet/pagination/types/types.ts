export type TPagination = {
	pageNumber: number
	countTotal: number
	cutSize: number
	cutSizeOptions?: Array<number>
	middleDisplaySize?: number
	sideDislpaySize?: number
	pageToggle?: (a: string, v: number) => void
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
