const webpack = require('webpack')
const path = require('path')
const WebPackMerge = require('webpack-merge')
const WebPackBaseConfig = require('./webpack.base.conf.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob-all')
const PurifyCSSPlugin = require('purifycss-webpack')

module.exports = WebPackMerge(WebPackBaseConfig, {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:5].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, '../src/')
            ]),
            purifyOptions: {
                whitelist: ['*purify*']
            }
        }),
    ]
})