const DEFAULT_NS = `stname`

export type TRPCResult = {
	error: any
	data: any
	__arguments: any
}

export default new (class EventBus {
	private handlers: { [key: string]: any } = {}
	constructor() {
		this.handlers = {}
	}

	public on(eventName: string, callback: Function, spaceName: string = DEFAULT_NS): void {
		const handlers: { [key: string]: any } = this.handlers
		const sn: string = spaceName || DEFAULT_NS
		if (!eventName || typeof callback !== 'function') {
			return
		}
		if (!handlers[sn] || !handlers[sn][eventName]) {
			handlers[sn] = { [eventName]: [] }
		}
		handlers[sn][eventName].push(callback)
	}

	public async emit(eventName: string, params: any, spaceName: string = DEFAULT_NS): Promise<void> {
		const handlers: { [key: string]: any } = this.handlers
		const sn: string = spaceName || DEFAULT_NS
		if (!eventName || !handlers[sn]) {
			return
		}
		const length = (handlers[sn][eventName] || []).length
		for (let i = 0; i < length; i++) {
			await handlers[sn][eventName][i](params)
		}
	}

	public subscribe(eventName: string, callback: Function, spaceName: string = DEFAULT_NS): void {
		const handlers: { [key: string]: any } = this.handlers
		const sn: string = spaceName || DEFAULT_NS
		if (!eventName || typeof callback !== 'function') {
			return
		}
		if (!handlers[sn]) {
			handlers[sn] = {}
		}
		handlers[sn][eventName] = callback
	}

	public exec(eventName: string, params: any, spaceName: string = DEFAULT_NS): Promise<TRPCResult> {
		const handlers: { [key: string]: any } = this.handlers
		const sn: string = spaceName || DEFAULT_NS
		return new Promise(async (_, reject) => {
			try {
				if (!eventName || !handlers[sn] || !handlers[sn][eventName]) {
					_({ error: new Error(`Invilid Params`), data: null, __arguments: { eventName, params, spaceName: sn } })
					return
				}
				const fn = handlers[sn][eventName]
				const res: any = await fn(params)
				_({ error: null, data: res, __arguments: { eventName, params, spaceName: sn } })
			} catch (e) {
				_({ error: e, data: null, __arguments: { eventName, params, spaceName: sn } })
			}
		})
	}

	public clearEvent(eventName: string, spaceName: string = DEFAULT_NS): void {
		const handlers: { [key: string]: any } = this.handlers
		const sn: string = spaceName || DEFAULT_NS
		if (!eventName || !handlers[sn]) {
			return
		}
		delete handlers[sn][eventName]
	}

	public clearNameSpace(spaceName: string = DEFAULT_NS): void {
		const handlers: { [key: string]: any } = this.handlers
		const sn: string = spaceName || DEFAULT_NS
		if (!handlers[sn]) {
			return
		}
		handlers[sn] = {}
	}
})()
