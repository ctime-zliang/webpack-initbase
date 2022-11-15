import React from 'react'

export type TPageInputProps = {
	inputValue: number
	inputChangeAction: (e: React.FormEvent) => void
	inputBlurAction: (e: React.FocusEvent) => void
	confirmAction: (e: React.MouseEvent, v: number) => void
}

function PageInput(props: TPageInputProps): React.ReactElement {
	const { inputValue, inputChangeAction, inputBlurAction, confirmAction } = props
	const theWrapperClassName: string = 'page-input-wrapper'
	const theInputClassName: string = 'page-number-input'
	const theBtnClassName: string = 'page-goto-btn'
	const btnClickAction = (e: React.MouseEvent): void => {
		confirmAction(e, inputValue)
	}
	const inputFocusAction = (e: React.FocusEvent): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		inputElement.select && inputElement.select()
	}
	return (
		<li className={theWrapperClassName}>
			<input
				className={theInputClassName}
				value={inputValue}
				onChange={inputChangeAction}
				onBlur={inputBlurAction}
				onFocus={inputFocusAction}
			/>
			<div className={theBtnClassName} onClick={btnClickAction}>
				<span>跳转</span>
			</div>
		</li>
	)
}

export default React.memo(PageInput)
