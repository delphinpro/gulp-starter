/*!
 * gulp-starter
 * Task. Initialization HTTP-server for development
 * (c) 2016-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const bs = require('browser-sync');

const tools  = require('../lib/tools');
const config = require('../../gulp.config');

module.exports = function () {

    let instanceName = config.browserSync && config.browserSync.instanceName || 'delphinpro';

    return function (done) {

        if (bs.has(instanceName)) {
            tools.danger(`Browser Sync: An instance with the name '${instanceName}' already exists. Skip.`);
        } else {
            bs.create(instanceName);
            bs.get(instanceName).init(config.browserSync.options);
        }

        done();

    };

};
