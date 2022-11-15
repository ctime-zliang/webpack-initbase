import React from 'react'
import PageBreakItem from './PageBreakItem'
import PageNumberItem from './PageNumberItem'

export type TPageRangeProps = {
	pageTotal: number
	pageNumber: number
	middleDisplaySize: number
	sideDislpaySize: number
	confirmAction: (e: React.MouseEvent, v: number) => void
}

function PageRange(props: TPageRangeProps): React.ReactElement {
	const { pageTotal, pageNumber, middleDisplaySize, sideDislpaySize, confirmAction } = props
	const viewItemComponents: Array<React.ReactElement> = []
	if (pageTotal <= middleDisplaySize) {
		for (let i: number = 1; i <= pageTotal; i++) {
			viewItemComponents.push(<PageNumberItem key={i} isSelected={pageNumber === i} pageNumber={i} confirmAction={confirmAction} />)
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
				viewItemComponents.push(<PageNumberItem key={i} isSelected={pageNumber === i} pageNumber={i} confirmAction={confirmAction} />)
				continue
			}
			if (i >= Math.ceil(pageNumber - leftSide) && i <= Math.floor(pageNumber + rightSide)) {
				isCouldAddBreakItem = true
				viewItemComponents.push(<PageNumberItem key={i} isSelected={pageNumber === i} pageNumber={i} confirmAction={confirmAction} />)
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
