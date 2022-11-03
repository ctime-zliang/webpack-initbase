import { TSourceTreeItemData } from '../config/types'
import Stack from './Stack'

export function flattenTreeData(sourceTreeData: TSourceTreeItemData): any {
	const stack: Stack = new Stack()
	const obj: { [key: string]: any } = {}
	stack.push(sourceTreeData)
	while (stack.top) {
		const node: TSourceTreeItemData = stack.pop()
		for (let i in node.children) {
			stack.push(node.children[i])
		}
		obj[node.id] = node
	}
	return obj
}
