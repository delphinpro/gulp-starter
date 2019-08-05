/*!
 * gulp-starter
 * Task. Compile twig templates
 * (c) 2015-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const path = require('path');

const bs = require('browser-sync');

const gulp    = require('gulp');
const data    = require('gulp-data');
const twig    = require('gulp-twig');
const changed = require('gulp-changed-in-place');

const config      = require('../../gulp.config');
const tools       = require('../lib/tools');
const notifyError = require('../lib/notifyError');
const resolveUrl  = require('../lib/resolveUrl');
const bsNotify    = require('../lib/tools').bsNotify;
const DEVELOPMENT = require('../lib/checkMode').isDevelopment();

const { functions, loadData, extendFunction } = require('../lib/functions.twig');

module.exports = function () {

    let taskDef = {
        ...config.twig,
        extensions: config.twig.extensions.filter(item => item !== 'json'),
    };

    let { source, build } = tools.makePaths(taskDef);
    let twigOptionsBase   = path.join(config.root.src, config.twig.src);
    let exclude           = path.normalize('!**/{' + config.twig.excludeFolders.join(',') + '}/**');

    const taskTwig = function (done) {

        bsNotify('<span style="color:red">HTML is compiles...</span>', 15000);

        gulp.src([source, exclude], { since: gulp.lastRun(taskTwig) })

            .pipe(data(loadData))
            .on('error', err => notifyError(err, 'Twig compile error', done))

            .pipe(twig({
                base  : twigOptionsBase,
                functions,
                extend: extendFunction,
            }))
            .on('error', err => notifyError(err, 'Twig compile error', done))

            .pipe(resolveUrl(config.twig.resolveUrl))
            .on('error', err => notifyError(err, 'Twig compile error', done))

            .pipe(changed({ firstPass: true }))

            .pipe(gulp.dest(build))

            .on('end', function () {
                if (DEVELOPMENT && bs.has(config.browserSync.instanceName)) {
                    bs.get(config.browserSync.instanceName).reload();
                }

                done();
            });
    };

    return taskTwig;
};
