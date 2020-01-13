const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'production'

let pluginsConfig = [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        title: 'my App',
        template: path.join(__dirname, '../src/index.html')
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    })
]
if (!isDev) {
    pluginsConfig = pluginsConfig.concat(new MiniCssExtractPlugin({
        filename: "css/[name]_[contenthash].css"
    }))
}

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: path.join(__dirname, '../src/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?name=images/[name]-[contenthash:5].[ext]&limit=2000'
            }, {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: '/node_modules/',
                include: path.resolve(__dirname, '../src')
            }
        ]
    },
    plugins: pluginsConfig,
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}