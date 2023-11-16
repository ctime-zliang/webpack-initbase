import React, { useLayoutEffect, useRef, useState } from 'react'
import { ProxyStore, snapshot, subscribe } from '../../../../store/proxyStore'
import { Main } from './main'
import { createStoreInstance, MainStore, MainStoreContext } from './store/Main'

// function ProxyStoreRoot(): React.ReactElement {
// 	const [store, setStore] = useState<MainStore>(null!)
// 	const storeRef: { current: MainStore } = useRef<MainStore>(null!)
// 	useLayoutEffect((): (() => void) => {
// 		createStoreInstance().then((storeInstacen: MainStore): void => {
// 			setStore(storeInstacen)
// 			storeRef.current = storeInstacen
// 			storeRef.current.whenMouned()
// 		})
// 		return (): void => {
// 			storeRef.current.whenUnmount()
// 		}
// 	}, [])
// 	if (!store) {
// 		return <section>store initialing...</section>
// 	}
// 	return (
// 		<section>
// 			<MainStoreContext.Provider value={store}>
// 				<Main />
// 			</MainStoreContext.Provider>
// 		</section>
// 	)
// }

const data: any = {
	count: 0,
	text: 'hello',
	person: {
		name: 'proxystore',
		age: 23,
		box: {
			width: 3,
			heigth: 4,
		},
	},
}

function ProxyStoreRoot(): React.ReactElement {
	const proData = new ProxyStore(data).create()

	const unscribe = subscribe(proData, op => {
		const snap = snapshot(proData)
		console.log(`op`, JSON.stringify(op))
		console.log(`snap`, JSON.stringify(snap))
	})
	proData.count = 1
	// delete proData.text;
	proData.person.age = 3
	// unscribe();
	// proData.person.box.width = 5;
	return <section>Proxy Store</section>
}

export default React.memo(ProxyStoreRoot)
