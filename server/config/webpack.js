var path = require('path'),
    copyWebpackPlugin = require('copy-webpack-plugin'),
    nodeExternals = require('webpack-node-externals');

module.exports = {
    context: path.resolve('server'),
    entry: 'server',
    output: {
        path: path.resolve('./deployment/server'),
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
            }
        ]
    },
    plugins: [
        new copyWebpackPlugin([{
            from: '../package.json',
            to: 'package.json',
            toType: 'file'
        }], {
            copyUnmodified: true
        })
    ],
    resolve: {
        extensions: [
            '',
            '.js'
        ]
    }
}
