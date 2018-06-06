/**
 * gulp.starter
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const fs                   = require('fs');
const path                 = require('path');
const webpack              = require('webpack');
const VueLoaderPlugin      = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin       = require('uglifyjs-webpack-plugin');
const cfg                  = require('./gulp.config.js');
const pkg                  = require('./package.json');

const nodeEnv          = global.development ? 'development' : 'production';
const cssLoaderOptions = {minimize: true, url: false};

let alias   = {};
let bundles = [];

if (typeof pkg.webpack === 'object') {
    //bundles
    if (typeof pkg.webpack.bundles === 'object') {
        bundles = Object.keys(pkg.webpack.bundles);
    }

    //alias
    if (typeof pkg.webpack.alias === 'object') {
        alias = pkg.webpack.alias;
    }
}

let webpackConfig = {
    mode   : nodeEnv,
    cache  : true,
    output : {
        path    : __dirname,
        filename: '[name].bundle.js',
    },
    devtool: 'source-map',
    module : {
        rules: [
            {
                test: /\.css$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: cssLoaderOptions},
                ],
            },
            {
                test: /\.scss$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: cssLoaderOptions},
                    {loader: 'sass-loader'},
                ],
            },
            {
                test   : /\.js$/,
                exclude: [/node_modules/],
                loader : 'babel-loader',
            },
            {
                test   : /\.vue$/,
                loader : 'vue-loader',
                exclude: [/node_modules/],
            },
        ],
    },
    resolve: {
        modules   : ['node_modules'],
        extensions: ['.js', '.vue'],
        alias,
    },
    plugins: [
        new VueLoaderPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(nodeEnv),
        }),
    ],
};

if (!global.development) {
    webpackConfig.plugins.push(new UglifyJsPlugin({
        sourceMap    : false,
        parallel     : true,
        uglifyOptions: {
            warnings: false,
            output  : {
                comments: /^\**!|@preserve/,
            },
        },
    }));
}


bundles.forEach(item => {
    let manifestFile         = path.join(cfg.root.build, cfg.root.staticDir, `js/${item}.manifest.json`);
    let manifestFileResolved = path.resolve('.', manifestFile);

    if (fs.existsSync(manifestFileResolved)) {
        let manifest = require(manifestFileResolved);
        webpackConfig.plugins.push(new webpack.DllReferencePlugin({manifest}));
    } else {
        console.warn(`Webpack: manifest file not found [${manifestFile}]`);
    }
});

module.exports = webpackConfig;
