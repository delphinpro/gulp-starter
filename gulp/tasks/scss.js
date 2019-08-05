/*!
 * gulp-starter
 * Task. Compile SCSS
 * (c) 2015-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const path = require('path');

const bs           = require('browser-sync');
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const gulpIf       = require('gulp-if');
const sourceMaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const changed      = require('gulp-changed-in-place');

const tools         = require('../lib/tools');
const sassFunctions = require('../lib/functions.sass');
const resolveUrl    = require('../lib/resolveUrl');
const notify        = require('../lib/notifyError');
const DEVELOPMENT   = require('../lib/checkMode').isDevelopment();
const IS_DIST       = require('../lib/checkMode').checkMode('dist');
const config        = require('../../gulp.config');
const bsNotify      = require('../lib/tools').bsNotify;
const root          = config.root;

module.exports = function () {

    let src      = path.join(root.main, root.src, config.scss.src, tools.mask(config.scss.extensions));
    let destPath = IS_DIST
        ? path.join(root.main, tools.getTempDirectory())
        : path.join(root.main, root.build, root.static, config.scss.dest);

    tools.info(`Scss output: ${destPath}`);

    return function (done) {

        let sassOpts         = config.scss.sassOptions;
        sassOpts.outputStyle = DEVELOPMENT ? 'nested' : (sassOpts.outputStyle || 'compressed');
        sassOpts.functions   = sassFunctions;

        bsNotify('Style compile...', 15000);

        let pipeline = gulp.src(src)
            .on('end', () => {
                bsNotify('Style compiled', 1500);
                done();
            })

            .pipe(gulpIf(DEVELOPMENT, sourceMaps.init()))

            .pipe(sass(sassOpts)).on('error', (e) => { notify(e, 'sass', done); })

            .pipe(gulpIf(DEVELOPMENT, changed({ firstPass: true })))

            .pipe(autoprefixer())

            .pipe(resolveUrl(config.scss.resolveUrl)) // TODO Сделать резолв через импортеры

            .pipe(gulpIf(DEVELOPMENT, sourceMaps.write('.')))

            .pipe(gulp.dest(destPath));

        if (DEVELOPMENT && bs.has(config.browserSync.instanceName)) {
            pipeline.pipe(bs.get(config.browserSync.instanceName).stream());
        }

    };
};
