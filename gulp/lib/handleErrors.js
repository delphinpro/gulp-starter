/**
 * Errors handle.
 *
 * @since        22.04.2016 21:16
 * @license      Licensed under the MIT license
 */

const notify = require('gulp-notify');

module.exports = function (errorObject, callback) {
    notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
    // Keep gulp from hanging on this task
    if (typeof this.emit === 'function') this.emit('end');
};
