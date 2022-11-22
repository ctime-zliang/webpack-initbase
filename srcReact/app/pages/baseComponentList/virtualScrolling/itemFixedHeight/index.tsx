import React from 'react'
import { FixedSizeList } from '../../../../componnet/virtualScrolling'

function Row({ index, style }: { index: number; style: any }) {
	return (
		<div className={index % 2 ? 'odd' : 'even'} style={style}>
			Row {index}
		</div>
	)
}

function VSItemFixedScrolling(props: any): React.ReactElement {
	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 列表各项固定高度</h3>
			<div>
				<div style={{ width: '50%', border: '1px solid #dcdcdc' }}>
					<FixedSizeList containerHeight={200} itemHeight={25} itemCount={1000}>
						{Row}
					</FixedSizeList>
				</div>
			</div>
		</section>
	)
}

export default React.memo(VSItemFixedScrolling)
