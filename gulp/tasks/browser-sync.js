/**
 * Gulp-task. LiveReload.
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2016-2017 delphinpro
 * @license     licensed under the MIT license
 */

const bs = require('browser-sync');

module.exports = function(options) {

  return function() {
    if (bs.has(options.bs.instance)) {
      bs.get(options.bs.instance).init(options.browserSync);
    } else {
      console.warn(`Browser Sync: An instance with the name '${options.bs.instance}' was not found.`);
    }
  };
};
