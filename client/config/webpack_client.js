// Modules
const AutoPrefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    Path = require('path'),
    PreCSS = require('precss'),
    Webpack = require('webpack');

// Webpack Server configuration
const scriptBundleInputPaths = [
    Path.resolve(`${__dirname}/../react/app`)
];
const cssDestinationPath = './css/bundle.css';
const outputDestinationFolder = '/../dist';

module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
    entry: {
        'scripts/bundle': scriptBundleInputPaths
    },
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
                    'react',
                    'stage-3'
                ]
            },
            test: /\.jsx?$/
        }, {
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader'
            }),
            test: /\.css$/
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
        new ExtractTextPlugin(cssDestinationPath),
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new Webpack.LoaderOptionsPlugin({
            options: {
                postcss: () => [
                    PreCSS,
                    AutoPrefixer
                ]
            }
        }),
        new Webpack.optimize.UglifyJsPlugin({
            sourceMap: process.env.NODE_ENV !== 'production'
        })
    ],
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.css'
        ]
    }
};
