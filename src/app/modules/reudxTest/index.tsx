import React from 'react'
import ReduxContainer1 from './container1'
import ReduxContainer2 from './container2'

function ReduxRoot(props: any): React.ReactElement {
	return (
		<>
			<ReduxContainer1 />
			<ReduxContainer2 />
		</>
	)
}

export default ReduxRoot
