import React, { useState } from 'react'
import { Button } from 'antd'

function Counter() {
	const [count, setCount] = useState(0)
	const countClickAction = () => {
		setCount(count + 1)
	}
	return (
		<section style={{ padding: '10px 20px' }}>
			<Button onClick={countClickAction}>Click Count {count}</Button>
		</section>
	)
}

export default React.memo(Counter)
