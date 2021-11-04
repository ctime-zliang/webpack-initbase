/**
 * 异步等待阻塞
 * @param {number} delay 阻塞时长
 * @return {undefined}
 */
export async function sleep(delay = 1000) {
	return Promise((_, reject) => {
		window.setTimeout(_, delay)
	})
}

/**
 * 将数组依据指定的 keys 排序
 * @param {array} keys 参考字段数组
 * @param {boolean} seq 升序 or 降序
 * @return {number}
 */
export function sortBy(keys, seq = true) {
	const rev = !!seq ? 1 : -1
	return (a, b) => {
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i]
			if (a[key] !== b[key]) {
				if (a[key] > b[key]) {
					return rev * 1
				}
				return rev * -1
			}
		}
	}
}
