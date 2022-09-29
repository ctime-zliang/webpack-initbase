import React, { useEffect, useRef, useState } from 'react'
import { connect, Provider } from 'react-redux'
import { ACTION_TYPE as counter_ACTION_TYPE } from '@/store/redux/counter/types'
import { ACTION_TYPE as timeStamp_ACTION_TYPE } from '@/store/redux/timeStamp/types'
import ReduxView from './view'
import { store, TCombineState } from '@/store/redux'

function ReduxWrapper1(props: TReduxWrapper1Props) {
	const { count, stamp, changeCountAction, changeStampAction } = props
	return <ReduxView count={count} stamp={stamp} changeCountAction={changeCountAction} changeStampAction={changeStampAction} />
}

type TReduxWrapper1State = {
	count: number
	stamp: number
}

type TReduxWrapper1Dispatch = {
	changeCountAction: (...args: Array<any>) => void
	changeStampAction: (...args: Array<any>) => void
}

type TReduxWrapper1Props = TReduxWrapper1State & TReduxWrapper1Dispatch

const mapStateToProps = (combineState: TCombineState): TReduxWrapper1State => {
	return {
		count: combineState.counter.count,
		stamp: combineState.timeStamp.stamp,
	}
}

const mapDispatchToProps = (dispatch: any): TReduxWrapper1Dispatch => {
	return {
		changeCountAction(params: any) {
			console.log(params)
			dispatch({
				type: counter_ACTION_TYPE.MODIFY_COUNTER,
				data: null,
			})
		},
		changeStampAction(params: any) {
			console.log(params)
			dispatch({
				type: timeStamp_ACTION_TYPE.CHANGE_STAMP,
				data: { stamp: new Date().getTime() },
			})
		},
	}
}

const ReduxContainer2 = connect(mapStateToProps, mapDispatchToProps)(ReduxWrapper1)

const ReduxContainer2App = (): React.ReactElement => {
	return (
		<Provider store={store}>
			<ReduxContainer2 />
		</Provider>
	)
}

export default ReduxContainer2App
