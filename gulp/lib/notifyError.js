/*!
 * gulp-starter
 * Errors handle
 * (c) 2016-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const notify = require('gulp-notify');

module.exports = function (errorObject, title, callback) {
    let message = `${errorObject.name}: ${errorObject.message}`;

    notify
        .onError({
            title,
            message,
        })
        .apply(this, arguments);

    if (typeof callback === 'function') {
        callback();
    }
};
