import React, { useEffect, useState } from 'react'
import { defaultProfile, EPageUpdateAction } from '../config/config'
import { TPaginationProfile, TPagination } from '../types/types'
import { correctionUserInput } from '../utils/correctionUserInput'
import PageInput from './PageInput'
import PageRange from './PageRange'
import '../styles/index.less'
import PageSelect from './PageSelect'

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
	const [countTotal, setCountTotal] = useState<number>(_countTotal)
	const [cutSize, setCutSize] = useState<number>(_isLegalCutSize ? _cutSize : cutSizeOptions[0])
	const [pageTotal, setPageTotal] = useState<number>(Math.ceil(countTotal / cutSize))
	const _calcPageNumber: number = correctionUserInput(_pageNumber, 1, pageTotal)
	const [pageNumber, setPageNumber] = useState<number>(_calcPageNumber)
	const [inputPageNumber, setInputPageNumber] = useState<number>(_calcPageNumber)

	const theContainerClassName: string = `pagination-container`
	const thePrevJumpWrapperClassName: string = `page-jump-wrapper page-prevjump-wrapper ${pageNumber <= 1 ? 'page-item-wrapper-disabled' : ''}`
	const theNextJumpWrapperClassName: string = `page-jump-wrapper page-nextjump-wrapper ${
		pageNumber >= pageTotal ? 'page-item-wrapper-disabled' : ''
	}`
	const theContentClassName: string = 'page-content'

	useEffect((): void => {
		if (_pageNumber === pageNumber) {
			return
		}
		const _calcPageNumber: number = correctionUserInput(_pageNumber, 1, pageTotal)
		setPageNumber(_calcPageNumber)
		setInputPageNumber(_calcPageNumber)
		pageToggle && pageToggle(EPageUpdateAction.REFRESH_PAGE, _calcPageNumber)
	}, [_pageNumber])

	useEffect((): void => {
		if (_countTotal === countTotal) {
			return
		}
		setCountTotal(_countTotal)
		setPageTotal(Math.ceil(_countTotal / cutSize))
		setPageNumber(1)
		setInputPageNumber(1)
		pageToggle && pageToggle(EPageUpdateAction.REFRESH_PAGE, 1)
	}, [_countTotal])

	const piecewiseToggleAcion = (e: React.FormEvent): void => {
		e.stopPropagation()
		e.preventDefault()
		const inputValue: number = +(e.target as HTMLInputElement).value || 1
		setCutSize(inputValue)
		setPageTotal(Math.ceil(_countTotal / inputValue))
		setPageNumber(1)
		setInputPageNumber(1)
		pageToggle && pageToggle(EPageUpdateAction.REFRESH_PAGE, 1)
		pagePiecewise && pagePiecewise(inputValue)
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
	const targetJumpPageAction = (e: React.MouseEvent, targetPage: number): void => {
		setPageNumber(targetPage)
		setInputPageNumber(targetPage)
		pageToggle && pageToggle(EPageUpdateAction.TARGET_JUMP, targetPage)
	}
	const inputPageChangeAction = (e: React.FormEvent): void => {
		const inputValue: number = +(e.target as HTMLInputElement).value || 1
		setInputPageNumber(inputValue)
	}
	const inputPageBlurAction = (e: React.FocusEvent): void => {
		const inputValue: number = +(e.target as HTMLInputElement).value || 1
		setInputPageNumber(correctionUserInput(inputValue, 1, pageTotal))
	}

	return (
		<ul className={theContainerClassName}>
			<li onClick={prevJumpAction} className={thePrevJumpWrapperClassName}>
				<span className={theContentClassName}>&lt;</span>
			</li>
			<PageRange
				pageTotal={pageTotal}
				pageNumber={pageNumber}
				middleDisplaySize={_middleDisplaySize}
				sideDislpaySize={_sideDislpaySize}
				confirmAction={targetJumpPageAction}
			/>
			<li onClick={nextJumpAction} className={theNextJumpWrapperClassName}>
				<span className={theContentClassName}>&gt;</span>
			</li>
			<PageInput
				inputValue={inputPageNumber}
				inputChangeAction={inputPageChangeAction}
				inputBlurAction={inputPageBlurAction}
				confirmAction={targetJumpPageAction}
			/>
			<PageSelect selectValue={cutSize} optionList={cutSizeOptions} selectChangeAction={piecewiseToggleAcion} />
		</ul>
	)
}

export default PaginationRoot
