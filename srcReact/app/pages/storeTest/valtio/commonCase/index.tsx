import React, { useLayoutEffect, useRef, useState } from 'react'
import { Main } from './main'
import { createStoreInstance, MainStoreContext, TMainStore } from './store/Main'

function ValtioRoot(): React.ReactElement {
	const [store, setStore] = useState<TMainStore>(null!)
	const storeRef: { current: TMainStore } = useRef<TMainStore>(null!)
	useLayoutEffect((): (() => void) => {
		createStoreInstance().then((storeInstacen: TMainStore): void => {
			setStore(storeInstacen)
			storeRef.current = storeInstacen
		})
		return (): void => {}
	}, [])
	if (!store) {
		return <section>store initialing...</section>
	}
	return (
		<section>
			<MainStoreContext.Provider value={store}>
				<Main />
			</MainStoreContext.Provider>
		</section>
	)
}
export default React.memo(ValtioRoot)
