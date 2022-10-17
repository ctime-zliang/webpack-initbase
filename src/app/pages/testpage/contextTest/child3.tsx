import React, { useContext, useState } from 'react'
import { defaultValue, LocalContext } from './contextManager'

function Child3Root(props: any): React.ReactElement {
	console.log(`Component: Child3Root`)
	return (
		<>
			<div>
				<strong>Child 3</strong>
			</div>
		</>
	)
}

export default React.memo(Child3Root)
