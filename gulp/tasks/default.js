/**
 * Default gulp-task.
 *
 * @since        30.06.2015 9:33
 * @license      Licensed under the MIT license
 */

const config = require('../../gulpfile');
if (!config.defaultTasks) return;

const gulp         = require('gulp');
const gulpSequence = require('gulp-sequence');

gulp.task('default', function (done) {
    gulpSequence.apply(null, ['build', 'watch', done]);
});
