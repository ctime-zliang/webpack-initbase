import React, { useLayoutEffect, useRef, useState } from 'react'
import { Main } from './main'
import { createStoreInstance, AtomStoreContext, TMixinStore } from './store/Main'

function ZustandRoot(): React.ReactElement {
	const [store, setStore] = useState<TMixinStore>(null!)
	const storeRef: { current: TMixinStore } = useRef<TMixinStore>(null!)
	useLayoutEffect((): (() => void) => {
		createStoreInstance().then((atomInstance: TMixinStore): void => {
			setStore(atomInstance)
			storeRef.current = atomInstance
		})
		return (): void => {}
	}, [])
	if (!store) {
		return <section>store initialing...</section>
	}
	return (
		<section>
			<AtomStoreContext.Provider value={store}>
				<Main />
			</AtomStoreContext.Provider>
		</section>
	)
}
export default React.memo(ZustandRoot)
