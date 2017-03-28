/**
 * Watch task
 *
 * @since        22.04.2016 20:43
 * @license      Licensed under the MIT license
 */

const config = require('../../gulpfile');
if (!config.watchableTasks) return;

const path  = require('path');
const gulp  = require('gulp');
const tools = require('../lib/tools');

gulp.task('watch', ['browserSync'], function () {
    config.watchableTasks.forEach(function (taskName) {
        let task = config[taskName];
        if (task) {
            let glob = path.join(config.root.src, task.src, tools.mask(task.extensions));
            gulp.watch(glob, [taskName]);
        }
    });
    gulp.watch('gulp/assets/dev-tools/**/*.scss', ['assets:css']);
    gulp.watch('gulp/assets/dev-tools/**/*.js', ['assets:js']);
});
