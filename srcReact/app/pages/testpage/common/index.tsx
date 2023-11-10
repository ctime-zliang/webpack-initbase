import { TCommonComponentBaseProps } from '../../../types/comm.types'
import React, { useState, useMemo, useCallback } from 'react'

function syncBlock(delay: number = 1000): void {
	const end: number = new Date().getTime() + delay
	let i: number = 0
	while (new Date().getTime() < end) {
		++i
	}
}

export function BaseUseMemo(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Component: BaseUseMemo`)

	const [count1, setCount1] = useState(1)
	const setCountAction1 = (): void => {
		setCount1(value => {
			return value + 1
		})
	}

	const number = useMemo((): number => {
		syncBlock()
		return count1 * 2
	}, [count1])

	return (
		<div className="row-index" style={{ border: '1px solid red' }} onClick={setCountAction1}>
			<div>{count1}</div>
			<div>{number}</div>
		</div>
	)
}

const sourceCallback = (): void => {
	console.log(`123456`)
}
let flagA: any = null
export function BaseUseCallback(props: TCommonComponentBaseProps): React.ReactElement {
	console.log('Component: BaseUseCallback')
	const [count, setCount] = useState(0)
	const btnClickAction = (): void => {
		setCount(count + 1)
	}
	const callback = useCallback(sourceCallback, [count])
	if (!flagA) {
		flagA = callback
	}
	console.log(callback === flagA)
	return (
		<article>
			<button onClick={btnClickAction}>Set Count</button>
			<div>{count}</div>
		</article>
	)
}
