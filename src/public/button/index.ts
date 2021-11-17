export function Button(options: { [key: string]: any } = {}): string {
	return `
        <button>${options.textContent}</button>
    `
}
