/**
 * Wofh Tools
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg               = require('./package.json');

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

console.log(alias);

let webpackConfig = {
  entry,
  output : {
    filename: '[name].bundle.js',
    library : '[name]_library',
  },
  module : {
    rules: [
      {
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : [
            {
              loader : 'css-loader',
              options: {
                minimize: true,
                url     : false,
              },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    modules   : ['node_modules'],
    extensions: ['.js'],
    alias,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress : {warnings: false},
      sourceMap: false,
      parallel : true,
    }),

    new ExtractTextPlugin('[name].bundle.css'),

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
      'process.env.NODE_ENV': '\'production\'',
    }),
  ],

};

module.exports = webpackConfig;
