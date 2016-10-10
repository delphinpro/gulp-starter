/**
 * Watch task
 *
 * @since        22.04.2016 20:43
 * @license      Licensed under the MIT license
 */

var config = require('../config');
var gulp   = require('gulp');
var path   = require('path');

var watchTask = function () {
    var watchableTasks = config.watchableTasks;

    watchableTasks.forEach(function (taskName) {
        var task = config[taskName];
        if (task) {
            var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
            gulp.watch(glob, [taskName]);
        }
    })
};

gulp.task('watch', ['browserSync'], watchTask);
