var path = require('path'),
    extractTextWebpackPlugin = require('extract-text-webpack-plugin'),
    nodeExternals = require('webpack-node-externals');

module.exports = {
    context: path.resolve('client'),
    entry: {
        bundle: [
            './react/app'
        ],
        vendor: [
            'jquery',
            'bootstrap-webpack',
            'font-awesome-webpack'
        ],
        server: [
            './server'
        ]
    },
    output: {
        path: path.resolve('./deployment/client'),
        filename: '[name].js'
    },
    target: 'node',
    node: {
        console: false,
        global: false,
        process: false,
        __filename: false,
        __dirname: false
    },
    externals: [
        nodeExternals()
    ],
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'jshint'
            }
        ],
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_module/,
                loader: 'babel'
            }, {
                test: /\.css$/,
                loader: extractTextWebpackPlugin('style', 'css!autoprefixer')
            }, {
                test: /\.scss$/,
                loader: extractTextWebpackPlugin('style', 'css!sass!autoprefixer')
            }, {
                test: /\.less$/,
                loader: extractTextWebpackPlugin('style', 'css!less')
            }, {
                test: /\.(jpg|jpeg|gif|png)(\?.*$|$)/,
                loader: 'url?limit=10000&name=../images/[name].[ext]'
            }, {
                test: /\.(svg|ttf|eot|woff|woff2)(\?.*$|$)/,
                loader: 'url?limit=10000&name=../fonts/[name].[ext]'
            }, {
                test: require.resolve('jquery'),
                loader: 'expose?jQuery!expose?$'
            }
        ]
    },
    plugins: [
        new extractTextWebpackPlugin('./content/css/styles.css')
    ],
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx',
            '.css'
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map'
}
