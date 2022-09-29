import React from 'react'
import { Button } from 'antd'

function ReduxView(props: TProps): React.ReactElement {
	const { count, stamp, changeCountAction, changeStampAction } = props
	return (
		<div data-tagitem="reduxView">
			<h3 style={{ marginTop: '1em' }}>Section: redux test</h3>
			<div>
				<div>
					<span>redux store - Count: </span>
					<span>{count}</span>
				</div>
				<div>
					<span>redux store - TimeStamp: </span>
					<span>{stamp}</span>
				</div>
			</div>
			<div>
				<Button onClick={changeCountAction}>Change Count</Button>
				<Button onClick={changeStampAction}>Change TimeStamp</Button>
			</div>
		</div>
	)
}

type TProps = {
	count: number
	stamp: number
	changeCountAction: (...args: Array<any>) => void
	changeStampAction: (...args: Array<any>) => void
}
export default ReduxView
