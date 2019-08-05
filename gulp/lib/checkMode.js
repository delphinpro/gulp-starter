/*!
 * gulp-starter
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

function checkMode(check) {
    return process.env.NODE_ENV === check;
}

function isDevelopment() {
    return checkMode('development');
}

function isProduction() {
    return checkMode('production') || checkMode('dist');
}

module.exports = {
    checkMode,
    isDevelopment,
    isProduction,
};
