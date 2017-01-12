// Webpack Server configuration
var AutoPrefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    Path = require('path'),
    PreCSS = require('precss');

module.exports = {
    devtool: process.env.NODE_ENV === 'production'
        ? ''
        : 'source-map',
    entry: {
        'scripts/bundle': [
            Path.resolve(`${__dirname}/../react/app`),
            Path.resolve(`${__dirname}/../content/css/main`)
        ],
        'scripts/vendor': [
            'font-awesome-webpack'
        ]
    },
    module: {
        loaders: [{
            exclude: /node_module/,
            loader: 'babel',
            query: {
                presets: [
                    'es2015',
                    'react',
                    'stage-3'
                ]
            },
            test: /\.jsx?$/
        }, {
            loader: ExtractTextPlugin.extract('style', 'css!postcss'),
            test: /\.css$/
        }, {
            loader: ExtractTextPlugin.extract('style', 'css!sass!postcss'),
            test: /\.scss$/
        }, {
            loader: ExtractTextPlugin.extract('style', 'css!less!postcss'),
            test: /\.less$/
        }, {
            loader: 'url?limit=10000&name=./images/[name].[ext]',
            test: /\.(jpg|jpeg|gif|png)(\?.*$|$)/
        }, {
            loader: 'url?limit=10000&name=./fonts/[name].[ext]',
            test: /\.(svg|ttf|eot|woff|woff2)(\?.*$|$)/
        }],
        preLoaders: [{
            exclude: /node_module/,
            loader: 'eslint',
            test: /\.js$/
        }]
    },
    node: {
        dns: 'empty',
        net: 'empty'
    },
    output: {
        filename: '[name].js',
        path: Path.resolve(`${__dirname}/../../../dist/client/content`)
    },
    plugins: [
        new ExtractTextPlugin('./css/styles.css')
    ],
    postcss: () => [
        PreCSS,
        AutoPrefixer
    ],
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx',
            '.css'
        ]
    }
};
