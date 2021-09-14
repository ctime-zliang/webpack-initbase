import Vue from 'vue'

console.log(Vue.version)

const fn = () => {
	console.log(`index`)
}

async function importLoad(url) {
	return import(url)
}
