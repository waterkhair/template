var nodeExternals = require('webpack-node-externals'),
    CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        server: [
            './server'
        ]
    },
    output: {
        path: '../../dist/client',
        filename: '[name].js'
    },
    target: 'node',
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
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new CopyPlugin([
                {
                    from: 'package.json',
                    to: 'package.json',
                    toType: 'file'
                }
            ], {
                copyUnmodified: true
            })
    ],
    resolve: {
        extensions: [
            '',
            '.js'
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map'
};
