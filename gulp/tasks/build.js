/**
 * Build gulp-task.
 *
 * @since        09.10.2016 7:06
 * @license      Licensed under the MIT license
 */

const config = require('../../gulpfile');
if (!config.defaultTasks) return;

const gulp         = require('gulp');
const gulpSequence = require('gulp-sequence');

gulp.task('build', function (done) {
    let args = config.defaultTasks.concat(done);
    gulpSequence.apply(null, args);
});
