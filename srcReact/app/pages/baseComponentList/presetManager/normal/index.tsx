import React, { useEffect, useState, useRef, useCallback } from 'react'
import { TPresetManagerDataItem } from 'srcReact/app/componnet/presetManager/types/types'
import PresetManager from '../../../../componnet/presetManager'
import testData from './config'

const copyTestData = JSON.parse(JSON.stringify(testData))

function isSelectedFixedListItem(listData: Array<TPresetManagerDataItem>, selectedValue: string): boolean {
	for (let i: number = listData.length - 1; i >= 0; i--) {
		if (listData[i].value === selectedValue) {
			return true
		}
	}
	return false
}

function PresetManagerNoraml(props: any): React.ReactElement {
	const elementRef: { current: any } = useRef<HTMLElement>(null)
	const [selectedValue, setSelectedValue] = useState<string>(copyTestData.initSelectedValue)
	const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState<boolean>(false)
	const [isSaveAsBtnDisabled, setIsSaveAsBtnDisabled] = useState<boolean>(false)
	const tag: boolean = isSelectedFixedListItem(copyTestData.fixedList, selectedValue)
	const [isRenameBtnDisabled, setIsRenameBtnDisabled] = useState<boolean>(tag)
	const [isDeleteBtnDisabled, setIsDeleteBtnDisabled] = useState<boolean>(tag)
	const onTogglePresetSelectedAction = (value: string): void => {
		console.log(value)
		const tag: boolean = isSelectedFixedListItem(copyTestData.fixedList, value)
		if (tag) {
			setIsRenameBtnDisabled(true)
			setIsDeleteBtnDisabled(true)
			return
		}
		setIsRenameBtnDisabled(false)
		setIsDeleteBtnDisabled(false)
	}
	const onActionTagClickedAction = (value: string): void => {
		console.log(value)
	}
	return (
		<section style={{ padding: `5px 5px 5px 5px`, height: '100%' }}>
			<div ref={elementRef} style={{ width: '100%', height: '100%' }}>
				<div style={{ width: `200px`, height: `50px`, paddingTop: `0` }}>
					<PresetManager
						fixedList={copyTestData.fixedList}
						floatList={copyTestData.floatList}
						initSelectedValue={selectedValue}
						saveBtnDisabled={isSaveBtnDisabled}
						saveBtnTitle={copyTestData.saveBtnTitle}
						renameBtnDisabled={isRenameBtnDisabled}
						renameBtnTitle={copyTestData.renameBtnTitle}
						saveAsBtnDisabled={isSaveAsBtnDisabled}
						saveAsbtnTitle={copyTestData.saveAsbtnTitle}
						deleteBtnDisabled={isDeleteBtnDisabled}
						deleteBtnTitle={copyTestData.deleteBtnTitle}
						onTogglePresetSelected={onTogglePresetSelectedAction}
						onActionTagClicked={onActionTagClickedAction}
					/>
				</div>
			</div>
		</section>
	)
}

export default React.memo(PresetManagerNoraml)
