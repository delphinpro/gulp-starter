/**
 * Gulpfile
 *
 * Modified from https://github.com/vigetlabs/gulp-starter/
 */

'use strict';

global.production = false;

var requireDir = require('require-dir');
requireDir('./gulp/tasks', { recurse: true });
