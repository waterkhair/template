// Webpack Server configuration
var CopyPlugin = require('copy-webpack-plugin'),
    Path = require('path'),
    webpackNodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        server: [
            Path.resolve(`${__dirname}/../server`)
        ]
    },
    externals: [
        webpackNodeExternals()
    ],
    module: {
        loaders: [{
            exclude: /node_module/,
            loader: 'babel',
            query: {
                presets: [
                    'es2015',
                    'stage-3'
                ]
            },
            test: /\.js$/
        }],
        preLoaders: [{
            exclude: /node_module/,
            loader: 'eslint',
            test: /\.js$/
        }]
    },
    output: {
        filename: '[name].js',
        path: Path.resolve(`${__dirname}/../../../dist/client`)
    },
    plugins: [
        new CopyPlugin([{
            from: 'package.json',
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
    },
    target: 'node'
};
