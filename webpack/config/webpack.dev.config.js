const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')

const webpackDevConfig = {
    /* ... */
}

module.exports = merge(webpackDevConfig, webpackBaseConfig)