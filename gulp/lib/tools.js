/**
 * Tools.
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2016-2017 delphinpro
 * @license     licensed under the MIT license
 */

module.exports = {
  mask: function(extensions) {
    if (typeof extensions === 'undefined') return '';
    return extensions.length > 1
        ? '**/*.{' + extensions + '}'
        : '**/*.' + extensions + '';
  },
};
