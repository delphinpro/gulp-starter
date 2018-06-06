/**
 * Compile javascript files from libs of third party through NPM
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const path   = require('path');
const notify = require('../lib/handleErrors');

const gulp          = require('gulp');
const webpackStream = require('piped-webpack');

module.exports = function (options) {

    let dist = path.join(options.root.build, options.webpack.build);

    return function () {
        let wpConfig = require(path.join(global.ROOT, 'vendor.webpack.config.js'));

        return gulp.src([])
            .pipe(webpackStream(wpConfig)).on('error', notify)
            .pipe(gulp.dest(dist));
    };
};
