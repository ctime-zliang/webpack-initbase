import React, { useEffect, useRef, useState } from 'react'
import { store, TCombineState } from '@/store/redux'
import { ACTION_TYPE as counter_ACTION_TYPE } from '@/store/redux/counter/types'
import { ACTION_TYPE as timeStamp_ACTION_TYPE } from '@/store/redux/timeStamp/types'
import ReduxView from './view'

function ReduxContainer1(props: any): React.ReactElement {
	const combineState: TCombineState = store.getState()
	const subscribeHandler: { current: any } = useRef<any>(null)
	const [count, setCount] = useState<number>(combineState.counter.count)
	const [timeStamp, setTimeStamp] = useState<number>(combineState.timeStamp.stamp)
	const changeCountAction = (): void => {
		store.dispatch({
			type: counter_ACTION_TYPE.MODIFY_COUNTER,
			data: null,
		})
	}
	const changeTimeStampAction = (): void => {
		store.dispatch({
			type: timeStamp_ACTION_TYPE.CHANGE_STAMP,
			data: { timeStamp: new Date().getTime() },
		})
	}

	useEffect((): (() => void) => {
		subscribeHandler.current = store.subscribe((): void => {
			const newCombineStore: TCombineState = store.getState()
			setCount(newCombineStore.counter.count)
			setTimeStamp(newCombineStore.timeStamp.stamp)
		})
		return (): void => {
			subscribeHandler.current.unsubscribe()
		}
	}, [])

	return <ReduxView count={count} timeStamp={timeStamp} changeCountAction={changeCountAction} changeTimeStampAction={changeTimeStampAction} />
}

export default ReduxContainer1
