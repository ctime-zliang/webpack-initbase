const chalk = require('chalk')
const JestEnvironmentNode = require('jest-environment-node')
const puppeteer = require('puppeteer')
const fs = require('fs')
const os = require('os')
const path = require('path')

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

class PuppeteerEnvironment extends JestEnvironmentNode {
	constructor(config) {
		super(config)
	}

	async setup() {
		console.log(chalk.yellow('Setup Test Environment'))
		await super.setup()
		const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8')
		if (!wsEndpoint) {
			throw new Error('wsEndpoint not found')
		}
		const browser = await puppeteer.connect({
			browserWSEndpoint: wsEndpoint,
		})
		/*
            写入全局属性
         */
		this.global.page = await browser.newPage()
	}

	async teardown() {
		console.log(chalk.yellow('Teardown Test Environment'))
		await super.teardown()
	}

	runScript(script) {
		return super.runScript(script)
	}
}

module.exports = PuppeteerEnvironment
