import React from 'react'
import PageBreakItem from './PageBreakItem'
import PageShowItem from './PageShowItem'

type TPageRangeProps = {
	pageTotal: number
	middleDisplaySize: number
	sideDislpaySize: number
	pageNumber: number
	inputValue: number
	inputChangeAction: (e: React.FormEvent) => void
	confirmAction: (e: React.MouseEvent | React.KeyboardEvent, v: number) => void
}
function PageRange(props: TPageRangeProps): React.ReactElement {
	const { pageTotal, middleDisplaySize, sideDislpaySize, pageNumber } = props
	const viewItemComponents: Array<React.ReactElement> = []
	if (pageTotal <= middleDisplaySize) {
		for (let i: number = 1; i <= pageTotal; i++) {
			viewItemComponents.push(<PageShowItem key={i} isSelected={pageNumber === i} {...props} pageNumber={i} />)
		}
	} else {
		let leftSide: number = middleDisplaySize / 2
		let rightSide: number = middleDisplaySize - leftSide

		if (pageNumber > pageTotal - middleDisplaySize / 2) {
			rightSide = pageTotal - pageNumber
			leftSide = middleDisplaySize - rightSide
		} else if (pageNumber < middleDisplaySize / 2) {
			leftSide = pageNumber
			rightSide = middleDisplaySize - leftSide
		}

		let isCouldAddBreakItem: boolean = true
		for (let i: number = 1; i <= pageTotal; i++) {
			const thePageNumber: number = i
			if (thePageNumber <= sideDislpaySize || thePageNumber > pageTotal - sideDislpaySize) {
				isCouldAddBreakItem = true
				viewItemComponents.push(<PageShowItem key={i} isSelected={pageNumber === i} {...props} pageNumber={i} />)
				continue
			}
			if (i >= Math.ceil(pageNumber - leftSide) && i <= Math.floor(pageNumber + rightSide)) {
				isCouldAddBreakItem = true
				viewItemComponents.push(<PageShowItem key={i} isSelected={pageNumber === i} {...props} pageNumber={i} />)
				continue
			}
			if (isCouldAddBreakItem) {
				isCouldAddBreakItem = false
				viewItemComponents.push(<PageBreakItem key={i} />)
			}
		}
	}
	return <>{viewItemComponents}</>
}

export default PageRange
