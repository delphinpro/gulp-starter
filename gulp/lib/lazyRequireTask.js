/**
 * Lazy require task
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const gulp = require('gulp');
const path = require('path');

/**
 * @param taskName Название задачи
 * @param taskFile Имя файла с задачей, без расширения .js
 * @param options  Основные настройки задачи. Чаще всего глобальный объект настроек, кроме задач-сценариев
 * @param args     Дополнительные параметры для задачи, если требуется
 */
module.exports = function (taskName, taskFile, options, args) {
    options          = options || {};
    options.taskName = taskName;

    taskFile = path.resolve(`./gulp/tasks/${taskFile}.js`);

    gulp.task(taskName, function (cb) {
        let task = require(taskFile).call(this, options, args);

        return task(cb);
    });
};
