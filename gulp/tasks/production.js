/**
 * gulp-starter
 *
 * @since       09.10.2016 7:21
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2016 delphinpro
 * @license     licensed under the MIT license
 */
var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var config       = require('../config.js');


var productionTask = function (cb) {
    global.production = true;
    gulpSequence(config.defaultTasks, cb);
};

gulp.task('production', productionTask);
