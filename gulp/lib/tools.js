/**
 * Tools.
 *
 * @since        27.03.2017 22:00
 * @license      Licensed under the MIT license
 */

module.exports = {
    mask: function (extensions) {
        return extensions.length > 1
            ? '**/*.{' + extensions + '}'
            : '**/*.' + extensions + ''
            ;
    }
};
