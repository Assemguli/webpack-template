const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const buildWebpackCofig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: []
})

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackCofig)
})