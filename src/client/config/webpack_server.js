// Webpack Server configuration
var Path = require('path'),
    nodeExternals = require('webpack-node-externals'),
    CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        server: [
            Path.resolve(__dirname + '/../server')
        ]
    },
    output: {
        path: Path.resolve(__dirname + '/../../../dist/client'),
        filename: '[name].js'
    },
    target: 'node',
    externals: [
        nodeExternals()
    ],
    module: {
        preLoaders: [{
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'eslint'
            }
        ],
        loaders: [{
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015',
                        'stage-3'
                    ]
                }
            }
        ]
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
    }
};
