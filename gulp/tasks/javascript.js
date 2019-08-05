/*!
 * gulp-starter
 * Task. Processing js-files with babel and concat them
 * (c) 2018-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const path       = require('path');
const bs         = require('browser-sync');
const gulp       = require('gulp');
const gulpIf     = require('gulp-if');
const babel      = require('gulp-babel');
const sourceMaps = require('gulp-sourcemaps');
const concat     = require('gulp-concat');
const changed    = require('gulp-changed-in-place');

const bsNotify    = require('../lib/tools').bsNotify;
const DEVELOPMENT = require('../lib/checkMode').isDevelopment();
const notify      = require('../lib/notifyError');
const config      = require('../../gulp.config');

module.exports = function () {

    let srcRoot  = path.join(config.root.src, config.javascript.src);
    let destPath = path.join(config.root.build, config.javascript.build);

    return function (done) {

        let gulpConfigContent = require(path.join(config.root.main, 'gulp.config.js'));

        let src = gulpConfigContent.javascript.files.map(item => path.join(srcRoot, item));

        bsNotify('Javascript compile...', 15000);

        gulp.src(src, {allowEmpty: true})

            .on('end', () => {
                if (DEVELOPMENT && bs.has(config.browserSync.instanceName)) {
                    let bsInstance = bs.get(config.browserSync.instanceName);
                    bsInstance.notify('Javascript compiled', 1000);
                    bsInstance.reload();
                }

                done();
            })

            .pipe(gulpIf(DEVELOPMENT, sourceMaps.init()))

            .pipe(concat(config.javascript.outputName, { newLine: '/**/' })).on('error', notify)

            .pipe(babel()).on('error', notify)

            .pipe(gulpIf(DEVELOPMENT, changed({ firstPass: true })))

            .pipe(gulpIf(DEVELOPMENT, sourceMaps.write('.')))

            .pipe(gulp.dest(destPath));
    };
};
