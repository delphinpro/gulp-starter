/*!
 * gulp-starter
 * Task. Copy anything files
 * (c) 2017-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const path    = require('path');
const bs      = require('browser-sync');
const gulp    = require('gulp');
const changed = require('gulp-changed');

const config      = require('../../gulp.config');
const DEVELOPMENT = require('../lib/checkMode').isDevelopment();

function copyFiles(conf) {
    return new Promise((resolve, reject) => {

        if (!('src' in conf)) reject('Invalid config for "copy" task: undefined "src" param');
        if (!('dest' in conf)) conf.dest = '';
        if ('extensions' in conf) { }

        let source = path.join(config.root.main, conf.src);
        let dest   = path.join(config.root.main, config.root.build, conf.dest);

        gulp.src(source)

            .on('error', err => reject(err))

            .on('end', () => resolve())

            .pipe(changed(config.root.build))
            .pipe(gulp.dest(dest));

    });
}

module.exports = function () {

    return function (done) {
        let bsHasInstance = DEVELOPMENT && bs.has(config.browserSync.instanceName);

        if (bsHasInstance) {
            bs.get(config.browserSync.instanceName)
                .notify('<span style="color:red">Copy files...</span>', 20000);
        }

        let copies = [];

        config.copy.forEach(item => {
            copies.push(copyFiles(item, config));
        });

        Promise
            .all(copies)
            .then(() => done())
            .catch(err => done(err));
    };
};
