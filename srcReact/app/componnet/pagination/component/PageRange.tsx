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
		let middleStart: number = pageNumber - Math.floor(middleDisplaySize / 2)
		let middleEnd: number = pageNumber + Math.floor(middleDisplaySize / 2)
		let leftEnd: number = sideDislpaySize
		let rightStart: number = pageTotal - sideDislpaySize + 1
		if (leftEnd + 1 >= middleStart) {
			middleEnd = sideDislpaySize + middleDisplaySize + 1
		}
		if (rightStart - 1 <= middleEnd) {
			middleStart = pageTotal - (sideDislpaySize + middleDisplaySize)
		}
		let isCouldAddBreakItem: boolean = true
		for (let i: number = 1; i <= pageTotal; i++) {
			if (i <= leftEnd) {
				isCouldAddBreakItem = true
				viewItemComponents.push(<PageShowItem key={i} isSelected={pageNumber === i} {...props} pageNumber={i} />)
				continue
			}
			if (i >= rightStart) {
				isCouldAddBreakItem = true
				viewItemComponents.push(<PageShowItem key={i} isSelected={pageNumber === i} {...props} pageNumber={i} />)
				continue
			}
			if (i >= middleStart && i <= middleEnd) {
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
