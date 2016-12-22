var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'js/bundle': [
            './react/app',
            './content/css/main'
        ],
        'js/vendor': [
            'font-awesome-webpack'
        ]
    },
    output: {
        path: '../../dist/client/content',
        filename: '[name].js'
    },
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
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass!autoprefixer')
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less!autoprefixer')
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
    devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map'
};
