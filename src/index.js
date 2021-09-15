import Vue from 'vue'
import Sun, { useState } from 'sun'

console.log(Vue.version)
console.log(Sun)

const fn = () => {
	console.log(`index`)
}

async function importLoad(url) {
	return import(url)
}
