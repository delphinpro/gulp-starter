/**
 * gulp.starter
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const path                 = require('path');
const webpack              = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin       = require('uglifyjs-webpack-plugin');
const pkg                  = require('./package.json');

const nodeEnv          = global.development ? 'development' : 'production';
const cssLoaderOptions = {minimize: true, url: false};

let entry = {};
let alias = {};

if (typeof pkg.webpack === 'object') {
    // entries
    if (typeof pkg.webpack.bundles === 'object') {
        entry = pkg.webpack.bundles;
    } else {
        if (pkg.dependencies) {
            let vendor = [];
            for (let i in pkg.dependencies) {
                if (pkg.dependencies.hasOwnProperty(i)) {
                    vendor.push(i);
                }
            }
            entry = {vendor};
        }
    }

    //alias
    if (typeof pkg.webpack.alias === 'object') {
        alias = pkg.webpack.alias;
    }
}

let webpackConfig = {
    mode   : nodeEnv,
    entry,
    output : {
        path    : __dirname,
        filename: '[name].bundle.js',
        library : '[name]_library',
    },
    devtool: false,
    module : {
        rules: [
            {
                test: /\.css$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: cssLoaderOptions},
                ],
            },
        ],
    },
    resolve: {
        modules   : ['node_modules'],
        extensions: ['.js'],
        alias,
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap    : false,
            parallel     : true,
            uglifyOptions: {
                warnings: false,
                output  : {
                    comments: false,
                },
            },
        }),

        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
        }),

        new webpack.DllPlugin({
            name: '[name]_library',
            path: path.join(__dirname, '[name].manifest.json'),
        }),

        new webpack.ProvidePlugin({
            $              : 'jquery',
            jQuery         : 'jquery',
            'window.jQuery': 'jquery',
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(nodeEnv),
        }),
    ],
};

module.exports = webpackConfig;
