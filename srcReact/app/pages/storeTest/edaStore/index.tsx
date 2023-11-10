import React, { useLayoutEffect, useRef, useState } from 'react'
import { Main } from './main'
import { createStoreInstance, MainStore, MainStoreContext } from './store/Main'

function EdaStoreRoot(props: any): React.ReactElement {
	const [store, setStore] = useState<MainStore>(null!)
	const storeRef: { current: MainStore } = useRef<MainStore>(null!)
	useLayoutEffect((): void => {
		createStoreInstance().then((storeInstacen: MainStore): void => {
			setStore(storeInstacen)
			storeRef.current = storeInstacen
		})
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

export default EdaStoreRoot
