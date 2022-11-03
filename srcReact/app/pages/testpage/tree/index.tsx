import React, { useEffect, useState } from 'react'
import ReactTree from '../../../componnet/tree'
import { treeData } from './mock/data'

export function TreeRoot(props: any): React.ReactElement {
	const treeElementClickedAction = (itemData: any): void => {
		console.log(itemData)
	}
	return (
		<section style={{ margin: '50px auto', width: '70%', height: '200px' }}>
			<ReactTree sourceTreeData={treeData} treeElementClickedCallback={treeElementClickedAction} />
		</section>
	)
}
