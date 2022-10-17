import React, { useState } from 'react'
import { defaultValue, LocalContext, TContextDefaultValue } from './contextManager'
import Child1Root from './child1'
import Child2Root from './child2'
import Child3Root from './child3'

function ParentRoot(props: any): React.ReactElement {
	console.log(`Component: ParentRoot`)
	const [name, setName] = useState<string>(defaultValue.name)
	const [number, setNumber] = useState<number>(defaultValue.number)
	const contextProviderValue: TContextDefaultValue = { name, number, setName, setNumber }
	return (
		<>
			<LocalContext.Provider value={contextProviderValue}>
				<Child1Root />
				<Child2Root />
				<Child3Root />
			</LocalContext.Provider>
		</>
	)
}

export default ParentRoot
