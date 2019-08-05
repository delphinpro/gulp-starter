/*!
 * gulp-starter
 * Task. Optimize images
 * (c) 2015-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const bs             = require('browser-sync');
const gulp           = require('gulp');
const changed        = require('gulp-changed');
const imagesOptimize = require('gulp-imagemin');
const tools          = require('../lib/tools');
const config         = require('../../gulp.config');

const DEVELOPMENT = require('../lib/checkMode').isDevelopment();

module.exports = function () {

    const {source, build} = tools.makePaths(config.images);

    return function (done) {
        gulp.src([source], {since: gulp.lastRun('images')})

            .on('end', function () {
                if (DEVELOPMENT && bs.has(config.browserSync.instanceName)) {
                    bs.get(config.browserSync.instanceName).reload();
                }

                done();
            })

            .pipe(changed(build))
            .pipe(imagesOptimize([
                imagesOptimize.gifsicle(),
                imagesOptimize.jpegtran({
                    progressive: true,
                }),
                imagesOptimize.optipng(),
                imagesOptimize.svgo(),
            ]))
            .pipe(gulp.dest(build))
        ;
    };
};
