import React, { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Clock from '../../../utils/clockCanvas'

const Container = styled.section`
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	flex-wrap: nowrap;
`

const BETWEEN_HEIGHT: number = 100
const RATIO: number = 0.55

function ClockCanvasRoot() {
	const clockReference = useRef<any>(null as any)
	const canvsElementReference = useRef<any>(null as any)
	const canvasWidth: number = 400
	const canvasHeight: number = 400
	const initClock = (): void => {
		clockReference.current = new Clock(canvsElementReference.current, {
			canvasWidth,
			canvasHeight,
			clockRadius: (canvasWidth / 2) * 0.825,
		})
	}
	const resizeHandler = useCallback((e?: any): void => {
		const rootElement: HTMLElement = document.documentElement || document.body
		const areaHeight: number = rootElement.getBoundingClientRect().height - BETWEEN_HEIGHT
		if (clockReference.current) {
			clockReference.current.cancel()
			clockReference.current.setCanvasRect(areaHeight * RATIO, areaHeight * RATIO)
			clockReference.current.setCockRadius(areaHeight * RATIO * 0.5 * 0.825)
			clockReference.current.render()
		}
	}, [])
	useEffect((): (() => void) => {
		initClock()
		window.addEventListener('resize', resizeHandler)
		resizeHandler()
		return () => {
			clockReference.current && clockReference.current.cancel()
			window.removeEventListener('resize', resizeHandler)
		}
	}, [])
	return (
		<Container>
			<canvas ref={canvsElementReference} width={canvasWidth} height={canvasHeight}></canvas>
		</Container>
	)
}

export default React.memo(ClockCanvasRoot)
