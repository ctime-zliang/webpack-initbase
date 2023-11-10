import React, { useEffect, useRef, useState } from 'react'
import { defaultProfile, VERTICAL_GAP, VIEWPORT_PADDING } from '../config/config'
import { DataItem, TBoundingClientRectResultToJSONResult, TPresetManagerProps } from '../types/types'
import '../styles/index.less'
import PresetList from './PresetList'
import { findItemByValue } from '../utils/findItemByValue'

function PresetManager(props: TPresetManagerProps): React.ReactElement {
	const copyDefaultProfileRef: { current: TPresetManagerProps } = useRef<TPresetManagerProps>(JSON.parse(JSON.stringify(defaultProfile)))
	const {
		fixedList = copyDefaultProfileRef.current.fixedList,
		floatList = copyDefaultProfileRef.current.floatList,
		initSelectedValue = copyDefaultProfileRef.current.initSelectedValue,
		saveBtnDisabled = copyDefaultProfileRef.current.saveBtnDisabled,
		saveBtnTitle = copyDefaultProfileRef.current.saveBtnTitle,
		renameBtnDisabled = copyDefaultProfileRef.current.renameBtnDisabled,
		renameBtnTitle = copyDefaultProfileRef.current.renameBtnTitle,
		saveAsBtnDisabled = copyDefaultProfileRef.current.saveAsBtnDisabled,
		saveAsbtnTitle = copyDefaultProfileRef.current.saveAsbtnTitle,
		deleteBtnDisabled = copyDefaultProfileRef.current.deleteBtnDisabled,
		deleteBtnTitle = copyDefaultProfileRef.current.deleteBtnTitle,
		onTogglePresetSelected,
		onActionTagClicked,
	} = props
	const selectedItem: DataItem | null = findItemByValue([...fixedList, ...floatList], initSelectedValue)
	const presetManagerContainerRef: { current: any } = useRef<HTMLElement>(null)
	const presetManagerWrapperRef: { current: any } = useRef<HTMLElement>(null)
	const [isShowList, setIsShowList] = useState<boolean>(false)
	const [staticShowText, setStaticShowText] = useState<string>(selectedItem ? selectedItem.title : '-')

	const onPresetMgrClickedAction = (e: React.MouseEvent): void => {
		const targetElement: HTMLElement = e.target as HTMLElement
		if (isShowList) {
			if (presetManagerWrapperRef.current && presetManagerWrapperRef.current.contains(targetElement)) {
				setIsShowList(false)
				return
			}
		}
		setIsShowList(true)
	}
	const onPresetMgrbluredAction = (e: React.FocusEvent): void => {
		setIsShowList(false)
	}
	const setListComponentHidden = (): void => {
		if (presetManagerContainerRef.current) {
			presetManagerContainerRef.current.blur()
		}
	}

	useEffect((): void => {
		if (isShowList && presetManagerContainerRef.current) {
			const presetlistContainer = presetManagerContainerRef.current.querySelector(`[data-tagitem="presetlist-container"]`)
			const topContainerRect: TBoundingClientRectResultToJSONResult = presetManagerContainerRef.current.getBoundingClientRect().toJSON()
			const listContainerRect: TBoundingClientRectResultToJSONResult = presetlistContainer.getBoundingClientRect().toJSON()
			const listContainerEncroachmentHeight: number = listContainerRect.height + VERTICAL_GAP + VIEWPORT_PADDING
			const viewClientHeight: number = document.documentElement.clientHeight

			if (viewClientHeight <= listContainerEncroachmentHeight) {
				listContainerRect.top = topContainerRect.bottom + VERTICAL_GAP - topContainerRect.top
				listContainerRect.bottom = listContainerRect.height + listContainerRect.top
			} else {
				if (viewClientHeight - topContainerRect.bottom < listContainerEncroachmentHeight) {
					listContainerRect.top = -1 * listContainerRect.height - VERTICAL_GAP - 2
					listContainerRect.bottom = listContainerRect.height + listContainerRect.top
				} else {
					listContainerRect.top = topContainerRect.height + VERTICAL_GAP
					listContainerRect.bottom = listContainerRect.height + listContainerRect.top
				}
			}

			listContainerRect.width = topContainerRect.width
			listContainerRect.right = listContainerRect.width + listContainerRect.width
			presetlistContainer.style.top = listContainerRect.top + 'px'
			presetlistContainer.style.width = listContainerRect.width - 2 + 'px'
		}
	}, [isShowList])

	useEffect((): void => {
		const selectedItem: DataItem | null = findItemByValue([...fixedList, ...floatList], initSelectedValue)
		if (!selectedItem) {
			setStaticShowText('-')
			return
		}
		if (selectedItem.title !== staticShowText) {
			setStaticShowText(selectedItem.title)
			return
		}
	}, [initSelectedValue])

	useEffect((): void => {
		const selectedItem: DataItem | null = findItemByValue([...fixedList, ...floatList], initSelectedValue)
		setStaticShowText(selectedItem ? selectedItem.title : '-')
	}, [floatList, fixedList])

	return (
		<div
			className="presetmgr-container"
			ref={presetManagerContainerRef}
			tabIndex={0}
			onBlur={onPresetMgrbluredAction}
			onClick={onPresetMgrClickedAction}
		>
			<div ref={presetManagerWrapperRef} className="presetmgr-wrapper">
				<div className="staticshow-content">{staticShowText}</div>
				<svg className="staticshow-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
					<path d="M511.862 750.76l-431.297-431.297 34.419-34.419 431.297 431.297-34.419 34.419z" fill="#272636"></path>
					<path d="M942.267 319.461l-431.298 431.298-34.419-34.419 431.298-431.298 34.419 34.419z" fill="#272636"></path>
				</svg>
			</div>
			{isShowList ? (
				<PresetList
					fixedList={fixedList}
					floatList={floatList}
					setListComponentHidden={setListComponentHidden}
					setStaticShowText={setStaticShowText}
					saveBtnDisabled={saveBtnDisabled as boolean}
					saveBtnTitle={saveBtnTitle as string}
					renameBtnDisabled={renameBtnDisabled as boolean}
					renameBtnTitle={renameBtnTitle as string}
					saveAsBtnDisabled={saveAsBtnDisabled as boolean}
					saveAsbtnTitle={saveAsbtnTitle as string}
					deleteBtnDisabled={deleteBtnDisabled as boolean}
					deleteBtnTitle={deleteBtnTitle as string}
					onTogglePresetSelected={onTogglePresetSelected}
					onActionTagClicked={onActionTagClicked}
				/>
			) : null}
		</div>
	)
}

export default React.memo(PresetManager)
