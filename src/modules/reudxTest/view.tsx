import React from 'react'
import { Button } from 'antd'

function ReduxView(props: TProps): React.ReactElement {
	const { count, timeStamp, changeCountAction, changeTimeStampAction } = props
	return (
		<div data-tagitem="reduxView">
			<h3 style={{ marginTop: '1em' }}>Section: redux test</h3>
			<div>
				<div>
					<span>redux store - Count: {count}</span>
					<span></span>
				</div>
				<div>
					<span>redux store - TimeStamp: {timeStamp}</span>
					<span></span>
				</div>
			</div>
			<div>
				<Button onClick={changeCountAction}>Change Count</Button>
				<Button onClick={changeTimeStampAction}>Change TimeStamp</Button>
			</div>
		</div>
	)
}

type TProps = {
	count: number
	timeStamp: number
	changeCountAction: () => void
	changeTimeStampAction: () => void
}
export default ReduxView
