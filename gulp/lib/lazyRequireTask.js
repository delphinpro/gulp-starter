/*!
 * gulp-starter
 * Lazy require task
 * (c) 2017-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const fs   = require('fs');
const path = require('path');
const gulp = require('gulp');

const config = require('../../gulp.config');
const tools  = require('./tools');

/**
 * @param taskName Название задачи
 * @param fileName
 * @param options Дополнительные параметры для задачи, если требуется
 */
module.exports = function (taskName, fileName = taskName, options = {}) {

    let taskFile = fileName.replace(/:/, '-');
    taskFile     = path.resolve(path.join(config.root.main, 'gulp/tasks', `${taskFile}.js`));

    if (!fs.existsSync(taskFile)) {
        tools.danger(`Task error [${taskName}]: File not found: ${taskFile}`);
        return;
    }

    let task = null;

    gulp.task(taskName, function (cb) {
        if (!task) {
            task = require(taskFile).call(this, options);
        }

        return task(cb);
    });

};
