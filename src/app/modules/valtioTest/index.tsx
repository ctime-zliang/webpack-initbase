import React, { useEffect, useRef } from 'react'
import { useSnapshot, subscribe } from 'valtio'
import { watch } from 'valtio/utils'
import { Button } from 'antd'
import { useComparisonThreshold } from '@/app/store/valtio/hooks'
import { valtioStore, valtioAction } from '@/app/store/valtio/store'
import { TValtioStore } from '@/app/store/valtio/types'

function ValtioRoot(props: any): React.ReactElement {
	const valtioSubscribeHandler: { current: any } = useRef<any>(null)
	const valtioWatchHandler: { current: any } = useRef<any>(null)
	const isThan: boolean = useComparisonThreshold()
	const valtioStoreSnapshot: TValtioStore = useSnapshot(valtioStore)
	const changeCountAction = (): void => {
		valtioAction.modifyCounter()
	}
	const changeTimeStampAction = (): void => {
		valtioAction.modifyTimeStamp(new Date().getTime())
	}

	useEffect((): (() => void) => {
		valtioSubscribeHandler.current = subscribe(valtioStore, (modifies: Array<Array<any>>): void => {
			console.log('valtio-store-state has modified to', modifies)
		})
		valtioWatchHandler.current = watch((get: (a: TValtioStore) => any): void => {
			console.log('valtio-store-state has changed to', get(valtioStore))
		})
		return (): void => {
			valtioSubscribeHandler.current()
			valtioWatchHandler.current()
		}
	}, [])

	return (
		<div data-tagitem="valtioRoot">
			<h3 style={{ marginTop: '1em' }}>Section: valtio test</h3>
			<div>
				<span>点击次数是否已大于等于 3 次? </span>
				{isThan ? <strong>是</strong> : <strong>否</strong>}
			</div>
			<div>
				<div>
					<span>valtio store - Count: </span>
					<span>{valtioStoreSnapshot.count}</span>
				</div>
				<div>
					<span>valtio store - TimeStamp: </span>
					<span>{valtioStoreSnapshot.timeStamp}</span>
				</div>
			</div>
			<div>
				<Button onClick={changeCountAction}>Change Count</Button>
				<Button onClick={changeTimeStampAction}>Change TimeStamp</Button>
			</div>
		</div>
	)
}

export default ValtioRoot
