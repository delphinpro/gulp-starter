/*!
 * gulp-starter
 * Task. Watching changed in source files
 * (c) 2016-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const gulp   = require('gulp');
const tools  = require('../lib/tools');
const config = require('../../gulp.config');

module.exports = function () {
    return function (done) {

        config.watchableTasks.forEach(taskName => {
            let taskDef = config[taskName];

            if (taskDef) {

                if (typeof taskDef.src === 'string') {

                    let glob = (`${config.root.src}/${taskDef.src}/${tools.mask(taskDef.extensions)}`);
                    tools.info(`watch [${taskName}]: ${glob}`);
                    gulp.watch(glob, gulp.series(taskName));

                } else {
                    tools.danger(`Watch [${taskName}] taskDef: invalid src type`);
                }
            }
        });

        done();
    };
};
