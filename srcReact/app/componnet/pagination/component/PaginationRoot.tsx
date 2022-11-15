import React, { useEffect, useState } from 'react'
import { defaultProfile, EPageUpdateAction } from '../config/config'
import { TPaginationProfile, TPagination } from '../types/types'
import { correctionUserInput } from '../utils/correctionUserInput'
import PageRange from './PageRange'
import PageSelect from './PageSelect'
import '../styles/index.less'

type TPaginationProps = TPagination
function PaginationRoot(props: TPaginationProps): React.ReactElement {
	// console.log(`Component: PaginationRoot`, props)
	const globalProfile: TPaginationProfile = { ...defaultProfile, ...props }
	const {
		middleDisplaySize: _middleDisplaySize,
		sideDislpaySize: _sideDislpaySize,
		pageNumber: _pageNumber,
		countTotal: _countTotal,
		cutSize: _cutSize,
		cutSizeOptions,
		pageToggle,
		pagePiecewise,
	} = globalProfile

	const _isLegalCutSize: boolean = !!cutSizeOptions.find((item: number): boolean => {
		return item === _cutSize
	})
	const _calcCutSize: number = _isLegalCutSize ? _cutSize : cutSizeOptions[0]
	const _calcPageTotal: number = Math.ceil(_countTotal / _calcCutSize)
	const _calcPageNumber: number = correctionUserInput(_pageNumber, 1, _calcPageTotal)

	const [countTotal, setCountTotal] = useState<number>(_countTotal)
	const [cutSize, setCutSize] = useState<number>(_calcCutSize)
	const [pageTotal, setPageTotal] = useState<number>(_calcPageTotal)
	const [pageNumber, setPageNumber] = useState<number>(_calcPageNumber)
	const [inputPageNumber, setInputPageNumber] = useState<number>(_calcPageNumber)

	const theContainerClassName: string = `pagination-container`
	const thePrevJumpWrapperClassName: string = `page-jump-wrapper page-prevjump-wrapper ${pageNumber <= 1 ? 'page-item-wrapper-disabled' : ''}`
	const theNextJumpWrapperClassName: string = `page-jump-wrapper page-nextjump-wrapper ${
		pageNumber >= pageTotal ? 'page-item-wrapper-disabled' : ''
	}`
	const theTotalcountWrapperClassName: string = `page-totalcount-wrapper`
	const theContentClassName: string = 'page-content'

	// useEffect((): void => {
	// 	if (_pageNumber === pageNumber) {
	// 		return
	// 	}
	// 	const _calcPageNumber: number = correctionUserInput(_pageNumber, 1, pageTotal)
	// 	setPageNumber(_calcPageNumber)
	// 	setInputPageNumber(_calcPageNumber)
	// 	pageToggle && pageToggle(EPageUpdateAction.REFRESH_PAGE, _calcPageNumber)
	// }, [_pageNumber])

	// useEffect((): void => {
	// 	if (_countTotal === countTotal) {
	// 		return
	// 	}
	// 	setCountTotal(_countTotal)
	// 	setPageTotal(Math.ceil(_countTotal / cutSize))
	// 	setPageNumber(1)
	// 	setInputPageNumber(1)
	// 	pageToggle && pageToggle(EPageUpdateAction.REFRESH_PAGE, 1)
	// }, [_countTotal])

	const piecewiseToggleAcion = (e: React.FormEvent): void => {
		e.stopPropagation()
		e.preventDefault()
		const inputValue: number = +(e.target as HTMLInputElement).value || 1
		setCutSize(inputValue)
		setPageTotal(Math.ceil(_countTotal / inputValue))
		setPageNumber(1)
		setInputPageNumber(1)
		pagePiecewise && pagePiecewise(inputValue)
		pageToggle && pageToggle(EPageUpdateAction.REFRESH_PAGE, 1)
	}
	const prevJumpAction = (e: React.MouseEvent): void => {
		e.stopPropagation()
		e.preventDefault()
		if (pageNumber > 0) {
			setPageNumber(pageNumber - 1)
			setInputPageNumber(pageNumber - 1)
			pageToggle && pageToggle(EPageUpdateAction.PREV_JUMP, pageNumber - 1)
		}
	}
	const nextJumpAction = (e: React.MouseEvent): void => {
		e.stopPropagation()
		e.preventDefault()
		if (pageNumber <= pageTotal - 1) {
			setPageNumber(pageNumber + 1)
			setInputPageNumber(pageNumber + 1)
			pageToggle && pageToggle(EPageUpdateAction.NEXT_JUMP, pageNumber + 1)
		}
	}
	const targetJumpPageAction = (e: React.MouseEvent | React.KeyboardEvent, targetPage: number): void => {
		setPageNumber(targetPage)
		setInputPageNumber(targetPage)
		pageToggle && pageToggle(EPageUpdateAction.TARGET_JUMP, targetPage)
	}
	const inputPageChangeAction = (e: React.FormEvent): void => {
		const inputValue: number = +(e.target as HTMLInputElement).value || 1
		setInputPageNumber(inputValue)
	}

	return (
		<ul className={theContainerClassName}>
			<li onClick={prevJumpAction} className={thePrevJumpWrapperClassName}>
				<span className={theContentClassName}>&lt;</span>
			</li>
			<PageRange
				inputValue={inputPageNumber}
				pageTotal={pageTotal}
				pageNumber={pageNumber}
				middleDisplaySize={_middleDisplaySize}
				sideDislpaySize={_sideDislpaySize}
				inputChangeAction={inputPageChangeAction}
				confirmAction={targetJumpPageAction}
			/>
			<li onClick={nextJumpAction} className={theNextJumpWrapperClassName}>
				<span className={theContentClassName}>&gt;</span>
			</li>
			<li className={theTotalcountWrapperClassName}>
				<span className={theContentClassName}>总计: {countTotal} 条</span>
			</li>
			<PageSelect selectValue={cutSize} optionList={cutSizeOptions} selectChangeAction={piecewiseToggleAcion} />
		</ul>
	)
}

export default PaginationRoot
