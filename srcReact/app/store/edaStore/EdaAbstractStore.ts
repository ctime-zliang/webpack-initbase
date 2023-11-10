import { Dispatch, useLayoutEffect, useState } from 'react'

type TWatcherItem = {
	setState: Dispatch<number>
	callback?: () => Promise<boolean> | boolean
}

export abstract class EdaAbstractStore {
	private _ticket: number
	private _checkPoint: number
	private _watcherCount: number
	private _watcherMap: Map<number, TWatcherItem>
	constructor() {
		this._ticket = 0
		this._checkPoint = 0
		this._watcherCount = 0
		this._watcherMap = new Map()
	}

	protected notify(): void {
		if (this._ticket === this._checkPoint) {
			Promise.resolve().then((): void => {
				this._watcherMap.forEach(async (watcher: TWatcherItem): Promise<void> => {
					if (watcher.callback) {
						;(await watcher.callback()) && watcher.setState(this._ticket)
					} else {
						watcher.setState(this._ticket)
					}
				})
				this._checkPoint = this._ticket
			})
			this._ticket++
		}
	}

	public createEffect(setState: Dispatch<number>, callback?: () => Promise<boolean> | boolean): () => () => void {
		const u: number = this._watcherCount++
		return (): (() => void) => {
			this._watcherMap.set(u, { setState, callback })
			return (): void => {
				this._watcherMap.delete(u)
			}
		}
	}
}
