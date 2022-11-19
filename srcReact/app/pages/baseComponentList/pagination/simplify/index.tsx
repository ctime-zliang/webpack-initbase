import React, { useEffect, useState } from 'react'
import { useContentBgColor } from '../../../../utils/hooks/useContentBgColor'
import Pagination, { TPagination } from '../../../../componnet/pagination'

const pageToggle = (action: string, value: number): void => {
	console.log('pageToggle', action, value)
}
const pagePiecewise = (value: number): void => {
	console.log('pagePiecewise', value)
}

function PaginationSimplify(props: any): React.ReactElement {
	const [cutSizeOptions] = useState<Array<number>>([15, 25, 35, 45, 55])
	const [gDisabled, setGDisabled] = useState<boolean>(true)
	useContentBgColor('rgba(255, 255, 255, 1)')
	useEffect((): void => {
		window.setTimeout((): void => {
			setGDisabled(false)
		}, 1500)
	}, [])
	return (
		<section>
			<Pagination
				pageNumber={1}
				countTotal={1000}
				cutSize={cutSizeOptions[0]}
				cutSizeOptions={cutSizeOptions}
				simplify={true}
				pageToggle={pageToggle}
				pagePiecewise={pagePiecewise}
				gDisabled={gDisabled}
			/>
		</section>
	)
}

export default React.memo(PaginationSimplify)
