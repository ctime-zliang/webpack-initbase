import React, { useContext, useState } from 'react'
import { defaultValue, LocalContext } from './contextManager'

function Child1Root(props: any): React.ReactElement {
	console.log(`Component: Child1Root`)
	const { name, number, setName, setNumber } = useContext(LocalContext)
	const changeNumberAction = (): void => {
		if (setNumber) {
			setNumber((preValue): number => {
				return preValue + 1
			})
		}
	}
	return (
		<>
			<div>
				<strong>Child 1</strong>
			</div>
			<div>The name is {name}</div>
			<div>The number is {number}</div>
			<div>
				<button onClick={changeNumberAction}>Change Number</button>
			</div>
		</>
	)
}

export default React.memo(Child1Root)
