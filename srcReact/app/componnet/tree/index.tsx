import React, { useState, useEffect } from 'react'

function Tree(props: any): React.ReactElement {
	const { treeData } = props
	const [type] = useState<string>('tree')
	const [renderData, setRenderData] = useState<Array<any>>([])
	return <div></div>
}
