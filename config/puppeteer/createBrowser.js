const puppeteer = require('puppeteer')

module.exports = async () => {
	const browser = await puppeteer.launch({
		headless: false,
		ignoreHTTPSErrors: true,
		slowMo: 100,
		handleSIGINT: true,
		timeout: 30000,
		dumpio: true,
		devtools: true,
		args: ['–no-sandbox', '--start-maximized'],
	})
	return browser
}
