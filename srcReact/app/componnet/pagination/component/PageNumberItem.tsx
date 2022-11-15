import React from 'react'

export type TPageNumberItemProps = {
	pageNumber: number
	isSelected: boolean
	confirmAction: (e: React.MouseEvent, v: number) => void
}

function PageNumberItem(props: TPageNumberItemProps): React.ReactElement {
	const { pageNumber, isSelected, confirmAction } = props
	const theItemWrapperClassName: string = isSelected ? 'page-item-wrapper page-item-wrapper-selected' : 'page-item-wrapper'
	const theContentClassName: string = 'page-content'
	const btnClickAction = (e: React.MouseEvent): void => {
		confirmAction(e, pageNumber)
	}
	return (
		<li className={theItemWrapperClassName} onClick={btnClickAction}>
			<span className={theContentClassName}>{pageNumber}</span>
		</li>
	)
}

export default React.memo(PageNumberItem)
