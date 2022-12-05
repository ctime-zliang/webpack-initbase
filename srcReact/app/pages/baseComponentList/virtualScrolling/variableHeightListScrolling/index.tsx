import { VariableHeightListScrolling, VariableHeightListRowItemStyle } from '../../../../componnet/virtualScrolling'
import React from 'react'

export function getRandomInArea(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const data: Array<any> = []
const dataLength: number = 10000
for (let id: number = 0; id < dataLength; ++id) {
	data.push({
		id,
		value: (function (): string {
			const len = getRandomInArea(200, 500)
			return Array(len).fill('0').join(' ')
		})(),
	})
}

function RowItem(props: any): React.ReactElement {
	const { index, styleObject } = props as { index: number; styleObject: VariableHeightListRowItemStyle }
	const rowItemStyle: React.CSSProperties = { ...styleObject, padding: '5px 0' }
	return (
		<div
			key={index}
			style={rowItemStyle}
			onClick={() => {
				console.log('item-', index)
			}}
		>
			Item: {data[index].id} | Data: {data[index].value}
		</div>
	)
}

function VariableHeightListScrollingRoot(): React.ReactElement {
	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 列表各项随机固定高度({dataLength} 条)</h3>
			<div>
				<div style={{ width: '50%', border: '1px solid #dcdcdc' }}>
					<VariableHeightListScrolling containerHeight={300} countTotal={dataLength}>
						{RowItem}
					</VariableHeightListScrolling>
				</div>
			</div>
		</section>
	)
}

export default React.memo(VariableHeightListScrollingRoot)
