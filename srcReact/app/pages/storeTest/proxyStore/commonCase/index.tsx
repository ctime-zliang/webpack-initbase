import React, { useLayoutEffect, useRef, useState } from 'react'
import { MarkOperationStructureItem, ProxyStore, snapshot, subscribe } from '../../../../store/proxyStore'
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
	username: 'zhangsan',
	level: '1',
	symbolItem: {
		title: 'symbol',
		author: {
			nickname: 'lisi',
		},
		id: 's-1',
	},
	footprintItem: {
		title: 'footprint',
		project: {
			projectName: 'test',
			belong: 'wangwu',
		},
		id: 'f-1',
	},
	list: [
		{ name: 'name-1', id: '1' },
		{ name: 'name-2', id: '2' },
	],
}

const proxyStore = new ProxyStore(data)
const proxyData = proxyStore.proxyObject

console.log(proxyStore)

// const cancel = subscribe(proxyData, (op: MarkOperationStructureItem): void => {
// 	console.log(`op = `, op)
// 	const snap = snapshot(proxyData)
// 	console.log(`snap = `, JSON.stringify(snap))
// })

const snap1 = snapshot(proxyData)
console.log(`snap1 = `, JSON.stringify(snap1))

proxyData.username = 'zhangsan_updated'
delete proxyData.level
proxyData.newKey = 'addKey'
proxyData.symbolItem.title = 'symbol_updated'
proxyData.age = 18
proxyData.list.push({ name: 'name-3', id: '3' })
proxyData.list[1].name = 'name-2_updated'

// cancel()

const snap2 = snapshot(proxyData)
console.log(`snap2 = `, JSON.stringify(snap2))

function ProxyStoreRoot(): React.ReactElement {
	return <section>Proxy Store</section>
}

export default React.memo(ProxyStoreRoot)
