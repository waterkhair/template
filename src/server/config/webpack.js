// Modules
var CopyPlugin = require('copy-webpack-plugin');
var Path = require('path');
var webpackNodeExternals = require('webpack-node-externals');

// Webpack Server configuration
var inputPath = '/../server';
var outputDestinationFolder = '/../../../build/Release/server';

module.exports = {
    entry: {
        server: [
            Path.resolve(Path.join(__dirname, inputPath))
        ]
    },
    externals: [
        webpackNodeExternals()
    ],
    module: {
        rules: [{
            enforce: 'pre',
            exclude: /node_module/,
            loader: 'eslint-loader',
            test: /\.js$/
        }, {
            exclude: /node_module/,
            loader: 'babel-loader',
            query: {
                presets: [
                    'es2015',
                    'stage-3'
                ]
            },
            test: /\.js$/
        }]
    },
    output: {
        filename: '[name].js',
        path: Path.resolve(Path.join(__dirname, outputDestinationFolder))
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
            '.js',
            '.json'
        ]
    },
    target: 'node'
};
