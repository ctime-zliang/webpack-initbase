// src/react-window/createListComponent.js

import React from 'react'

export function createListComponet({
	getEstimatedTotalSize, // 估算内容高度
	getItemSize, // 每一项的高度
	getItemOffset, // 每一项的 top 值
	getStartIndexForOffset,
	getEndIndexForOffset,
}: any) {
	return class extends React.Component {
		static defaultProps = {
			overscanCount: 8, // 性能好可以多设置
		}

		state = {
			scrollOffset: 0, // 向上卷去的高度，就是我们说的滚动距离，scrollTop，默认 0
		}

		instanceProps = {
			estimatedItemSize: (this.props as any).estimatedItemSize || 50,
			itemMetadataMap: {}, // 记录每个条目的信息 {[index]: {size: 每个索引对应的条目高度，offset: 每个索引对应的 top 值}}
			lastMeasuredIndex: -1, // 渲染过程中真实的测量每个条目的高度，就是计算每个条目真实的 offset 和 size。这个字段就是我们用来记录那条数据被渲染过了，计算过的可以直接用缓存的值
		}

		render() {
			// 这个类组件是返回的页面具体使用的那个组件，所以可以直接通过属性获取值
			const { width, height, itemCount, children: ComponentType } = this.props as any
			// 我们根据上面的 dom 结构可以写出如下布局
			const containerStyle = {
				position: 'relative',
				width,
				height,
				overflow: 'auto',
				willChange: 'transform',
			}
			const contentStyle = {
				width: '100%',
				height: getEstimatedTotalSize(this.props, this.instanceProps),
			}

			const items = []
			// 如果有列表长度，进行每一项的处理，样式待定
			if (itemCount > 0) {
				const [startIndex, endIndex] = this.getRangeToRender()
				// 这里我们现渲染所有的数据，稍后做截取处理
				for (let i = startIndex; i <= endIndex; i++) {
					const itemStyle = this.getItemStyle(i)
					items.push(<ComponentType index={i} style={itemStyle} key={i} />)
				}
			}
			return (
				<div style={containerStyle as React.CSSProperties} onScroll={this.scrollYAction.bind(this)}>
					<div style={contentStyle}>{items}</div>
				</div>
			)
		}

		scrollYAction(e: any) {
			this.setState({
				...this.state,
				scrollOffset: e.target.scrollTop,
			})
		}

		// 每一项的样式
		getItemStyle = (index: number) => {
			const style = {
				position: 'absolute',
				width: '100%',
				height: getItemSize(this.props, index, this.instanceProps),
				top: getItemOffset(this.props, index, this.instanceProps),
				left: 0,
			}
			return style
		}

		getRangeToRender() {
			const { scrollOffset } = this.state
			const { overscanCount, itemCount } = this.props as any
			const startIndex = getStartIndexForOffset(this.props, scrollOffset, this.instanceProps)
			const endIndex = getEndIndexForOffset(this.props, startIndex, scrollOffset, this.instanceProps)
			// 向下滚动要取最大值，向上滚动时要取最小值，需要跟索引临界值对比
			return [Math.max(0, startIndex - overscanCount), Math.min(itemCount - 1, endIndex + overscanCount)]
		}
	}
}
