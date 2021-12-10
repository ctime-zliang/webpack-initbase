const puppeteer = require('puppeteer')

module.exports = async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 0,
		defaultViewport: { width: 1400, height: 900 },
		args: ['–no-sandbox', '--window-size=1400,900'],
	})
	return browser
}
