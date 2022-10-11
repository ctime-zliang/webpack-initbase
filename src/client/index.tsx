import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import I18nProvider from '@/app/i18n/I18nProvider'
import { configureStore } from '@/app/store/redux'
import App from '../app/App'

export function renderReactApp(): void {
	console.log(`renderReactApp ☆☆☆`)
	const __render_id__: number = Math.random()
	const store = configureStore()
	ReactDOM.render(
		<Provider store={store}>
			<I18nProvider>
				<BrowserRouter>
					<HelmetProvider>
						<App __RenderProps__={{ __render_id__ }} store={store} />
					</HelmetProvider>
				</BrowserRouter>
			</I18nProvider>
		</Provider>,
		document.getElementById('reactApp')
	)
}
