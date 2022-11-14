import React from 'react'

export type TPageNumberBtnProps = {
	pageNumber: number
	isSelected: boolean
}

function PageNumberBtn(props: TPageNumberBtnProps): React.ReactElement {
	const { pageNumber, isSelected } = props
	const theItemClassName: string = isSelected ? 'selected' : ''
	return (
		<li className={theItemClassName}>
			<span className="page-link-btn">{pageNumber}</span>
		</li>
	)
}

export default React.memo(PageNumberBtn)
