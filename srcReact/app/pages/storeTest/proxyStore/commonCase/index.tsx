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
	username: 'zhang',
	level: '1',
	symbolItem: {
		title: 'symbol',
		id: 's-1',
		author: {
			username: 'zhang',
		},
		project: {
			projectName: 'test',
			belong: 'zhang',
		},
	},
	footprintItem: {
		title: 'footprint',
		id: 'f-1',
		author: {
			username: 'zhang',
		},
		project: {
			projectName: 'test',
			belong: 'zhang',
		},
	},
}

const proxyData = new ProxyStore(data).create()

const cancel = subscribe(proxyData, (op: any): void => {
	const snap = snapshot(proxyData)
	console.log(`op`, JSON.stringify(op))
	console.log(`snap`, JSON.stringify(snap))
})
proxyData.username = 'zhang_updated'
delete proxyData.level
proxyData.symbolItem.title = 'symbol_updated'
proxyData.age = 18

function ProxyStoreRoot(): React.ReactElement {
	// cancel();
	// proxyData.person.box.width = 5;
	return <section>Proxy Store</section>
}

export default React.memo(ProxyStoreRoot)
