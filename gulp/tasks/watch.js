/**
 * Watch task
 *
 * @since        22.04.2016 20:43
 * @license      Licensed under the MIT license
 */

const config = require('../config');
if (!config.watchableTasks) return;

const path   = require('path');
const gulp   = require('gulp');

gulp.task('watch', ['browserSync'], function () {
    config.watchableTasks.forEach(function (taskName) {
        let task = config[taskName];
        if (task) {
            let glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
            gulp.watch(glob, [taskName]);
        }
    })
});
