/**
 * Wofh Tools
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const fs                = require('fs');
const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cfg               = require('./gulp.config.js');
const pkg               = require('./package.json');

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
  cache  : true,
  output : {
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  module : {
    rules: [
      {
        test: /\.css$/,
        // use : ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        use : [
          {loader: 'style-loader'},
          {
            loader : 'css-loader',
            options: {
              minimize: true,
              url     : false,
            },
          },
        ],
        // }),
      },
      {
        test: /\.scss$/,
        // use : ExtractTextPlugin.extract({
        use : [
          {loader: 'style-loader'},
          {
            loader : 'css-loader',
            options: {
              minimize: true,
              url     : false,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
        // }),
      },
      {
        test   : /\.vue$/,
        loader : 'vue-loader',
        exclude: [/node_modules/],
        options: {
          loaders: {
            'js'  : 'babel-loader',
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'css' : 'vue-style-loader!css-loader',
          },
        },
      }, {
        test   : /\.js$/,
        exclude: [/node_modules/],
        loader : 'babel-loader',
      },
    ],
  },
  resolve: {
    modules   : ['node_modules'],
    extensions: ['.js'],
    alias,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    // new ExtractTextPlugin('styles.scss'),

    new webpack.optimize.UglifyJsPlugin({
      compress : {warnings: false},
      sourceMap: true,
      parallel : true,
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '\'production\'',
    }),
  ],
};

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
