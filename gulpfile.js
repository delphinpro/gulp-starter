/*!
 * gulp-starter
 * Gulpfile
 * (c) 2017-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

let nodeEnvWarn = false;

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
    nodeEnvWarn          = true;
}

const gulp            = require('gulp');
const tools           = require('./gulp/lib/tools');
const lazyRequireTask = require('./gulp/lib/lazyRequireTask');
const DEVELOPMENT     = require('./gulp/lib/checkMode').isDevelopment();
const IS_DIST         = require('./gulp/lib/checkMode').checkMode('dist');

tools.welcomeMessage();
if (nodeEnvWarn) tools.danger('  process.env.NODE_ENV undefined! Default set as \'production\'!');
tools[(DEVELOPMENT ? 'warn' : 'success')](`  DEVELOPMENT MODE: ${DEVELOPMENT ? 'ON' : 'OFF'}` + '\n');

/*==
 *== Task: default
 *== ======================================= ==*/

gulp.task('default', function (done) {

    gulp.series(
        gulp.parallel(
            'copy',
        ),
        gulp.parallel(
            'twig',
            'scss',
            'javascript',
            'fonts',
            'images',
        ),
        gulp.parallel(
            'watch',
            'serve',
        ),
    )(done);

});

/*==
 *== Task: build
 *== ======================================= ==*/

gulp.task('build', function (done) {
    tools.info(`Task build:${process.env.NODE_ENV}`);

    gulp.series(
        gulp.parallel(
            'copy',
        ),
        gulp.parallel(
            'twig',
            'scss',
            'javascript',
            'fonts',
            'images',
        ),
        IS_DIST ? 'dist' : 'nop',
    )(done);
});

/*==
 *== Other tasks
 *== ======================================= ==*/

lazyRequireTask('dist');
lazyRequireTask('copy');
lazyRequireTask('clean');
lazyRequireTask('clean:preview', 'clean', {preview: true});
lazyRequireTask('scss');
lazyRequireTask('twig');
lazyRequireTask('images');
lazyRequireTask('fonts');
lazyRequireTask('javascript');
lazyRequireTask('watch');
lazyRequireTask('serve');
gulp.task('nop', done => done());
