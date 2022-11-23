import React from 'react'
import { NotFixedSizeList } from '../../../../componnet/virtualScrolling'

const rowSizes = new Array(1000).fill(true).map(() => 25 + Math.round(Math.random() * 55))
const getItemSize = (index: number) => rowSizes[index]

function Row({ index, style }: { index: number; style: any }) {
	return (
		<div className={index % 2 ? 'odd' : 'even'} style={style}>
			Row {index}
		</div>
	)
}

function VSItemNotFixedScrolling(props: any): React.ReactElement {
	const itemCount: number = 2000
	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 列表各项任意高度({itemCount} 条)</h3>
			<div>
				<div style={{ width: '50%', border: '1px solid #dcdcdc' }}>
					<NotFixedSizeList containerHeight={'200px'} itemHeight={getItemSize} itemCount={itemCount}>
						{Row}
					</NotFixedSizeList>
				</div>
			</div>
		</section>
	)
}

export default React.memo(VSItemNotFixedScrolling)
