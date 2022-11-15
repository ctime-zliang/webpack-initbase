import React from 'react'

export type TPageSelectProps = {
	selectValue: number
	optionList: Array<number>
	selectChangeAction: (e: React.FormEvent) => void
}

function PageSelect(props: TPageSelectProps): React.ReactElement {
	const { selectValue, optionList, selectChangeAction } = props
	const theSelectWrapperClassName: string = `page-select-wrapper`
	const options: Array<React.ReactElement> = optionList.map((item: number, index: number): React.ReactElement => {
		return (
			<option key={index} value={item}>
				每页 {item} 条
			</option>
		)
	})
	return (
		<li className={theSelectWrapperClassName}>
			<select value={selectValue} onChange={selectChangeAction}>
				{options}
			</select>
		</li>
	)
}

export default React.memo(PageSelect)
