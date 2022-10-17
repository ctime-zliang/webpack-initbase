import React, { Context } from 'react'

export type TContextDefaultValue = {
	name: string
	number: number
	setName?: (setValue: string | ((preValue: string) => string)) => void
	setNumber?: (setValue: number | ((preValue: number) => number)) => void
}

export const defaultValue: TContextDefaultValue = {
	name: 'contextInitialValue',
	number: -1,
}

export const LocalContext: Context<TContextDefaultValue> = React.createContext(defaultValue)
