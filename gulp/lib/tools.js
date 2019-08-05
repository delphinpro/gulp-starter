/*!
 * gulp-starter
 * Utilities
 * (c) 2016-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const path  = require('path');
const chalk = require('chalk');
const bs    = require('browser-sync');

const pkg         = require('../../package');
const config      = require('../../gulp.config');
const DEVELOPMENT = require('./checkMode').isDevelopment();

const LINE_WIDTH = 30;
const LINE_H     = '─'; // 2500
const LINE_V     = '│'; // 2502
const LINE_TR    = '┐'; // 2510
const LINE_BR    = '┘'; // 2518
const LINE_TL    = '┌'; // 250C
const LINE_BL    = '└'; // 2514

let welcomeMessage = ``;
welcomeMessage += `${LINE_TL.padEnd(LINE_WIDTH, LINE_H) + LINE_TR}` + '\n';
welcomeMessage += `${LINE_V} ${pkg.name} v${pkg.version}`.padEnd(LINE_WIDTH) + LINE_V + '\n';
welcomeMessage += `${LINE_V} Frontend build system`.padEnd(LINE_WIDTH) + LINE_V + '\n';
welcomeMessage += `${LINE_BL.padEnd(LINE_WIDTH, LINE_H) + LINE_BR}` + '\n';

// noinspection JSUnusedGlobalSymbols
const tools = {
    mask(extensions) {
        if (typeof extensions === 'undefined') return '';

        if (!Array.isArray(extensions)) {
            extensions = extensions.toString().split(',');
        }

        extensions = extensions.map(item => item.trim());

        return extensions.length > 1
            ? '**/*.{' + extensions + '}'
            : '**/*.' + extensions + '';
    },

    /**
     * Сформировать пути для таска
     *
     * @param {Object, Object} taskDef
     * @param {string} taskDef.src
     * @param {string} taskDef.build
     * @param {string} taskDef.extensions
     * @returns {{source: string}}
     */
    makePaths(taskDef) {
        const source = path.resolve(config.root.src, taskDef.src, tools.mask(taskDef.extensions));
        const build  = path.resolve(config.root.build, taskDef.build);

        return {
            source,
            build,
        };
    },

    welcomeMessage() {
        // noinspection JSUnresolvedFunction,JSValidateTypes
        console.log(chalk.magentaBright(welcomeMessage));
    },

    info(msg) {
        // noinspection JSUnresolvedFunction,JSValidateTypes
        Array.from(arguments).map(msg => console.log(chalk.blue(msg)));
    },

    warn(msg) {
        // noinspection JSUnresolvedFunction,JSValidateTypes
        Array.from(arguments).map(msg => console.log(chalk.yellow(msg)));
    },

    success() {
        // noinspection JSUnresolvedFunction,JSValidateTypes
        Array.from(arguments).map(msg => console.log(chalk.green(msg)));
    },

    danger() {
        // noinspection JSUnresolvedFunction,JSValidateTypes
        Array.from(arguments).map(msg => console.log(chalk.red(msg)));
    },

    getTempDirectory() {
        return config.root.temp || '.tmp';
    },
};

function bsNotify(msg, timeout = 1000) {
    if (DEVELOPMENT && bs.has(config.browserSync.instanceName)) {
        bs.get(config.browserSync.instanceName).notify(msg, timeout);
    }
}

module.exports = tools;

module.exports.bsNotify = bsNotify;
