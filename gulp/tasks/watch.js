/**
 * Watch task
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2016-2017 delphinpro
 * @license     licensed under the MIT license
 */

const path  = require('path');
const gulp  = require('gulp');
const tools = require('../lib/tools');

module.exports = function (options) {
    return function (done) {
        options.watchableTasks.forEach(function (taskName) {
            let task = options[taskName];
            if (task) {
                if (typeof task.src === 'string') {
                    let glob = path.join(options.root.src, task.src, tools.mask(task.extensions));
                    gulp.watch(glob, [taskName]);
                } else if (typeof task.src === 'object') {
                    for (let i = 0; i < task.src.length; i++) {
                        let glob;
                        if (task.extensions) {
                            glob = path.join(options.root.src, task.src[i], tools.mask(task.extensions));
                        } else {
                            glob = path.join(options.root.src, task.src[i]);
                        }
                        gulp.watch(glob, [taskName]);
                    }
                }

                if (taskName === 'twig') {
                    gulp.watch(path.join(options.root.src, task.dataFile), [taskName]);
                }
            }
        });

        gulp.watch('gulp/frontend-tools/**/*.scss', ['frontend-tools:js']);
        gulp.watch('gulp/frontend-tools/**/*.js', ['frontend-tools:js']);
        gulp.watch('gulp/frontend-tools/*.*', ['frontend-tools:misc']);
        gulp.watch('gulp/frontend-tools/static/**', ['frontend-tools:misc']);
        gulp.watch('gulp/frontend-tools/classes/**', ['frontend-tools:misc']);
        gulp.watch('README.md', ['docs']);
        gulp.watch('docs/**', ['docs']);
    };
};
