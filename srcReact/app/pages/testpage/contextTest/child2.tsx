import React, { useContext, useState } from 'react'
import { defaultValue, LocalContext } from './contextManager'

function Child2Root(props: any): React.ReactElement {
	console.log(`Component: Child2Root`)
	const { setName, setNumber } = useContext(LocalContext)
	const changeNumberAction = (): void => {
		if (setNumber) {
			setNumber((preValue): number => {
				return preValue + 1
			})
		}
	}
	return (
		<LocalContext.Consumer>
			{({ name, number }) => {
				return (
					<>
						<div>
							<strong>Child 2</strong>
						</div>
						<div>The name is {name}</div>
						<div>The number is {number}</div>
						<div>
							<button onClick={changeNumberAction}>Change Number</button>
						</div>
					</>
				)
			}}
		</LocalContext.Consumer>
	)
}

export default React.memo(Child2Root)
