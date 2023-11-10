import React from 'react'
import { EPresetManagerActionTag } from '../config/config'
import { DataItem, TPresetListProps } from '../types/types'
import { findItemByValue } from '../utils/findItemByValue'

function PresetList(props: TPresetListProps): React.ReactElement {
	const {
		setListComponentHidden,
		setStaticShowText,
		fixedList,
		floatList,
		saveBtnDisabled,
		saveBtnTitle,
		renameBtnDisabled,
		renameBtnTitle,
		saveAsBtnDisabled,
		saveAsbtnTitle,
		deleteBtnDisabled,
		deleteBtnTitle,
		onTogglePresetSelected,
		onActionTagClicked,
	} = props
	const saveItemClassName: string = `presetlist-item` + (saveBtnDisabled ? ` presetlist-item-disabled` : '')
	const renameItemClassName: string = `presetlist-item` + (renameBtnDisabled ? ` presetlist-item-disabled` : '')
	const saveAsItemClassName: string = `presetlist-item` + (saveAsBtnDisabled ? ` presetlist-item-disabled` : '')
	const deleteItemClassName: string = `presetlist-item` + (deleteBtnDisabled ? ` presetlist-item-disabled` : '')

	const onTogglePresetSelectedAction = (e: React.MouseEvent<HTMLElement>): void => {
		const targetElement: HTMLElement = e.currentTarget as HTMLElement
		const value: string | null = targetElement.getAttribute('data-value')
		const findItem: DataItem = findItemByValue([...fixedList, ...floatList], value as string) as DataItem
		if (!value || !findItem || findItem.disabled) {
			return
		}
		setStaticShowText(findItem.title)
		onTogglePresetSelected && onTogglePresetSelected(value)
		window.setTimeout((): void => {
			setListComponentHidden()
		})
	}
	const onActionTagClickedAction = (e: React.MouseEvent<HTMLElement>): void => {
		const targetElement: HTMLElement = e.currentTarget as HTMLElement
		const action: string = targetElement.getAttribute('data-action') as string
		if (!action || targetElement.classList.contains('presetlist-item-disabled')) {
			return
		}
		onActionTagClicked && onActionTagClicked(action as EPresetManagerActionTag)
		window.setTimeout((): void => {
			setListComponentHidden()
		})
	}

	return (
		<div className="presetlist-container" data-tagitem="presetlist-container">
			<main className="presetlist-wrapper">
				<ul className="presetlist-ulist">
					{fixedList.map((item: DataItem, index: number): React.ReactElement => {
						const liItemClassName: string = `presetlist-item` + (item.disabled ? ` presetlist-item-disabled` : '')
						return (
							<li key={index} className={liItemClassName} data-value={item.value} onClick={onTogglePresetSelectedAction}>
								<div className="presetlist-content">{item.title}</div>
							</li>
						)
					})}
					<li className="presetlist-separator"></li>
					{floatList.map((item: DataItem, index: number): React.ReactElement => {
						const liItemClassName: string = `presetlist-item` + (item.disabled ? ` presetlist-item-disabled` : '')
						return (
							<li key={index} className={liItemClassName} data-value={item.value} onClick={onTogglePresetSelectedAction}>
								<div className="presetlist-content">{item.title}</div>
							</li>
						)
					})}
					<li className="presetlist-separator"></li>
					<li className={saveItemClassName} data-action={EPresetManagerActionTag.SAVE} onClick={onActionTagClickedAction}>
						<div className="presetlist-content">{saveBtnTitle}</div>
					</li>
					<li className={saveAsItemClassName} data-action={EPresetManagerActionTag.SAVE_AS} onClick={onActionTagClickedAction}>
						<div className="presetlist-content">{saveAsbtnTitle}</div>
					</li>
					<li className={renameItemClassName} data-action={EPresetManagerActionTag.RENAME} onClick={onActionTagClickedAction}>
						<div className="presetlist-content">{renameBtnTitle}</div>
					</li>
					<li className={deleteItemClassName} data-action={EPresetManagerActionTag.DELETE} onClick={onActionTagClickedAction}>
						<div className="presetlist-content">{deleteBtnTitle}</div>
					</li>
				</ul>
			</main>
		</div>
	)
}

export default React.memo(PresetList)
