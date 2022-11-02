import React from 'react'
import useStore from '../../../utils/hooks/useStore'

const initialState = {
	counter: 0,
}
const actions: { [Key: string]: any } = {
	addToCounter(store: any, amount: any) {
		const newCounterValue = store.state.counter + amount
		store.setState({ counter: newCounterValue })
	},
}
const useHook = useStore(initialState, actions)

function Test01(props: any): React.ReactElement {
	const [state, action] = useHook()
	return (
		<div>
			<p>
				counter:
				{state.counter}
			</p>
			<button type="button" onClick={() => action.addToCounter(1)}>
				+1 to global
			</button>
		</div>
	)
}

function UseStoreRoot(props: any): React.ReactElement {
	return (
		<>
			<Test01 />
		</>
	)
}

export default UseStoreRoot
