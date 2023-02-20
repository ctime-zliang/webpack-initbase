import React from 'react'
import { TSeparatorProps } from '../types/type'

function Separator(props: TSeparatorProps): React.ReactElement {
	return <li className={'ctxmenu-separator'}></li>
}

export default React.memo(Separator)
