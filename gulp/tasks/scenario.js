/**
 * Run multiple tasks
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2016-2017 delphinpro
 * @license     licensed under the MIT license
 */

const gulpSequence = require('gulp-sequence');

module.exports = function (params) {
    return function (done) {

        if (params.taskName === 'default' || params.taskName === 'development') {
            require('browser-sync').create(params.instanceName);
        }

        let taskList = params.tasks.concat(done);

        console.info(`${params.taskName.toUpperCase()} -> ${JSON.stringify(params.tasks)}`);

        gulpSequence.apply(null, taskList);
    };
};
