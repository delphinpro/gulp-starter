/*!
 * gulp-starter
 * Task. Copy fonts
 * (c) 2015-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const bs     = require('browser-sync');
const gulp   = require('gulp');
const tools  = require('../lib/tools');
const config = require('../../gulp.config');

const DEVELOPMENT = require('../lib/checkMode').isDevelopment();

module.exports = function () {

    const {source, build} = tools.makePaths(config.fonts);

    function fonts(done) {
        gulp.src([source], {since: gulp.lastRun(fonts)})
            .pipe(gulp.dest(build))

            .on('end', function () {
                if (DEVELOPMENT && bs.has(config.browserSync.instanceName)) {
                    bs.get(config.browserSync.instanceName).reload();
                }

                done();
            });
    }

    return fonts;
};
