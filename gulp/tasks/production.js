/**
 * gulp-starter
 *
 * @since       09.10.2016 7:21
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2016 delphinpro
 * @license     licensed under the MIT license
 */

const config       = require('../config.js');
if (!config.defaultTasks) return;

const gulp         = require('gulp');
const gulpSequence = require('gulp-sequence');


gulp.task('production', function (cb) {
    global.production = true;
    gulpSequence(config.defaultTasks, cb);
});
