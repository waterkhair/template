// Webpack Server configuration
var Path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    PreCSS = require('precss'),
    AutoPrefixer = require('autoprefixer');

module.exports = {
    entry: {
        'js/bundle': [
            Path.resolve(__dirname + '/../react/app'),
            Path.resolve(__dirname + '/../content/css/main')
        ],
        'js/vendor': [
            'font-awesome-webpack'
        ]
    },
    output: {
        path: Path.resolve(__dirname + '/../../../dist/client/content'),
        filename: '[name].js'
    },
    module: {
        preLoaders: [{
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'jshint'
            }
        ],
        loaders: [{
                test: /\.jsx?$/,
                exclude: /node_module/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015',
                        'react',
                        'stage-3'
                    ]
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass!postcss')
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less!postcss')
            }, {
                test: /\.(jpg|jpeg|gif|png)(\?.*$|$)/,
                loader: 'url?limit=10000&name=./images/[name].[ext]'
            }, {
                test: /\.(svg|ttf|eot|woff|woff2)(\?.*$|$)/,
                loader: 'url?limit=10000&name=./fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/styles.css')
    ],
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx',
            '.css'
        ]
    },
    postcss: () => {
        return [
            PreCSS,
            AutoPrefixer
        ];
    },
    devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map'
};
