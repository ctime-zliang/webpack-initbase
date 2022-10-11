import React from 'react'
import ReactDOM from 'react-dom'

class Overlay extends React.Component {
	state: Readonly<{}>
	container: HTMLElement
	constructor(props: any) {
		super(props)
		this.state = {}
		this.container = document.createElement('section')
		document.body.appendChild(this.container)
	}

	componentDidMount(): void {
		console.log(this.container)
	}

	componentWillUnmount(): void {
		document.body.removeChild(this.container)
	}

	render(): React.ReactElement {
		return ReactDOM.createPortal(
			<>
				<div data-tagitem="OverlayContainer">{this.props.children}</div>
			</>,
			this.container
		)
	}
}

export default Overlay
