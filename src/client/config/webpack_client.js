// Modules
var AutoPrefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Path = require('path');
var PreCSS = require('precss');

// Webpack Server configuration
var scriptBundleInputPaths = [
    Path.resolve(`${__dirname}/../react/app`),
    Path.resolve(`${__dirname}/../content/css/main`)
];
var vendorBundleInputModules = [
    'font-awesome-webpack'
];
var cssDestinationPath = './css/styles.css';
var fontsDestinationFolder = './fonts';
var imagesDestinationFolder = './images';
var outputDestinationFolder = '/../../../build/Release/client/content';

module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
    entry: {
        'scripts/bundle': scriptBundleInputPaths,
        'scripts/vendor': vendorBundleInputModules
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
            loader: `url?limit=10000&name=${fontsDestinationFolder}/[name].[ext]`,
            test: /\.(svg|ttf|eot|woff|woff2)(\?.*$|$)/
        }, {
            loader: `url?limit=10000&name=${imagesDestinationFolder}/[name].[ext]`,
            test: /\.(jpg|jpeg|gif|png)(\?.*$|$)/
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
        path: Path.resolve(Path.join(__dirname, outputDestinationFolder))
    },
    plugins: [
        new ExtractTextPlugin(cssDestinationPath)
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
