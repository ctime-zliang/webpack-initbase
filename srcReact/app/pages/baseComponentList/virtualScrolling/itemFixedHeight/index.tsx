import React from 'react'
import { FixedSizeList } from '../../../../componnet/virtualScrolling'

function Row({ index, style }: { index: number; style: React.CSSProperties }) {
	return (
		<div className={index % 2 ? 'odd' : 'even'} style={style}>
			Row {index}
		</div>
	)
}

function VSItemFixedScrolling(props: any): React.ReactElement {
	const itemCount: number = 2000
	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 列表各项固定高度({itemCount} 条)</h3>
			<div>
				<div style={{ width: '50%', border: '1px solid #dcdcdc' }}>
					<FixedSizeList containerHeight={'200px'} itemHeight={'25px'} itemCount={itemCount}>
						{Row}
					</FixedSizeList>
				</div>
			</div>
		</section>
	)
}

export default React.memo(VSItemFixedScrolling)
