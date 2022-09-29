import React from 'react'
import { useSnapshot } from 'valtio'
import { Button } from 'antd'
import { useComparisonThreshold } from '@/store/valtio/hooks'
import { valtioStore, valtioAction } from '@/store/valtio/store'
import { TValtioStore } from '@/store/valtio/types'

function ValtioRoot(props: any): React.ReactElement {
	const isThan: boolean = useComparisonThreshold()
	const valtioStoreSnapshot: TValtioStore = useSnapshot(valtioStore)
	const changeCountAction = (): void => {
		valtioAction.modifyCounter()
	}
	const changeTimeStampAction = (): void => {
		valtioAction.modifyTimeStamp(new Date().getTime())
	}
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
