/**
 * Errors handle.
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2016-2017 delphinpro
 * @license     licensed under the MIT license
 */

const notify = require('gulp-notify');

module.exports = function (errorObject, callback) {
    notify
        .onError(errorObject.toString().split(': ').join(':\n'))
        .apply(this, arguments);

    if (typeof this.emit === 'function') {
        this.emit('end');
    }
};
