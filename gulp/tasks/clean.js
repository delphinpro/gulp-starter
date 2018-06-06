/**
 * Gulp-task. Clean build directory.
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2016-2017 delphinpro
 * @license     licensed under the MIT license
 */

const fs   = require('fs');
const path = require('path');
const del  = require('del');

const conf = require('../../gulp.config.js');

function scanDir(dir) {
    let result = [];
    let nodes  = fs.readdirSync(path.resolve(dir));

    nodes.forEach(node => {
        let name = path.join(dir, node);

        result.push(name);

        if (fs.statSync(name).isDirectory()) {
            result = [...result, ...scanDir(name)];
        }
    });

    return result;
}

function normalizePathExcludes(excludes, root) {
    return typeof excludes === 'object'
        ? excludes.map(item => path.join(root, item))
        : [];
}

String.prototype.startOf = function (substring) {
    if (typeof substring !== 'string' || substring === '') return false;

    return (this.indexOf(substring) === 0);
};

String.prototype.shortPath = function () {
    let re = new RegExp('\\' + path.sep, 'g');
    return this.replace(conf.root.build, '').replace(re, '/');
};

const LINE_WIDTH = 70;

const LINE_H     = '─'; // 2500
const LINE_V     = '│'; // 2502
const LINE_TR    = '┐'; // 2510
const LINE_BR    = '┘'; // 2518
const LINE_TL    = '┌'; // 250C
const LINE_BL    = '└'; // 2514
const LINE_RIGHT = '┤'; // 2524
const LINE_LEFT  = '├'; // 251C

function printList(caption, list, isPath = false) {
    if (!list.length) {
        let msg = `${caption} <== EMPTY`;
        console.log(msg.padStart(msg.length + 2, ' '));
        return;
    }
    console.log(LINE_TL.padEnd(LINE_WIDTH, LINE_H) + LINE_TR);
    console.log(`${LINE_V} ${caption}`.padEnd(LINE_WIDTH) + LINE_V);
    console.log(LINE_LEFT.padEnd(LINE_WIDTH, LINE_H) + LINE_RIGHT);
    list.forEach(item => console.log(`${LINE_V} ${isPath ? item.shortPath() : item}`.padEnd(LINE_WIDTH) + LINE_V));
    console.log(LINE_BL.padEnd(LINE_WIDTH, LINE_H) + LINE_BR);
}

module.exports = function (options, args) {
    return function (done) {

        if (!Array.isArray(options.cleaning)) {
            options.cleaning = [options.cleaning];
        }

        let targets = [];

        for (let index in options.cleaning) {
            if (!options.cleaning.hasOwnProperty(index)) continue;

            let itemOpts  = options.cleaning[index];
            let cleanRoot = options.root.build;

            if (itemOpts.root && fs.existsSync(path.join(cleanRoot, itemOpts.root))) {
                cleanRoot = path.join(cleanRoot, itemOpts.root);
            }

            if (!fs.existsSync(cleanRoot)) {
                console.log(`Clean task [${index}]: Nothing to delete.`);
                continue;
                // done();
            }

            let originalExcludes = normalizePathExcludes(itemOpts.exclude, cleanRoot);
            if (typeof args === 'object' && args.preview) {
                printList(`Original excludes [${index}]:`, originalExcludes, true);
            }

            let fsObjects = scanDir(cleanRoot);
            // printList('File system objects:', fsObjects, true);

            for (let i = 0, len = fsObjects.length; i < len; i++) ;

            let tmp = fsObjects.filter(item => {
                // if (12 > index || index > 15) return false;
                // console.log('-----------');
                // console.log(`item > (${index})`, item);
                let keep = true;
                for (let i = 0, len = originalExcludes.length; i < len; i++) {
                    let origin = originalExcludes[i];
                    // console.log('');

                    if (item.startOf(origin)) {
                        keep = false;
                    }

                    let lastIndex = 0;
                    while (lastIndex !== -1 && origin !== cleanRoot) {
                        let test = (item === origin);
                        // console.log('test >', test, origin);
                        if (test) keep = false;
                        lastIndex = origin.lastIndexOf(path.sep);
                        origin    = origin.substring(0, lastIndex);
                    }
                }

                // console.log(keep ? 'DELETE' : 'EXCLUDE');

                return keep;
            });

            let parent   = '';
            let _targets = tmp.filter(item => {
                if (!parent) {
                    parent = item;
                }

                // console.log(
                //     'parent >',
                //     (item !== parent && item.startOf(parent)) ? '[+]' : '[-]',
                //     parent.replace('public_html', '').replace(/\\/g, '/'),
                //     '<=>',
                //     item.replace('public_html', '').replace(/\\/g, '/'),
                // );

                if (item !== parent && item.startOf(parent)) {
                    return false;
                } else {
                    parent = item;
                }

                return true;
            });

            targets = targets.concat(_targets);

            // printList(`Clean directory [${index}]: ${cleanRoot}`, _targets, true);
        }


        printList(`Clean directory [ALL]:`, targets, true);

        if (typeof args === 'object' && args.preview) {
            done();
        } else {
            // noinspection JSUnresolvedFunction
            del(targets).then(paths => {
                console.warn(`Removed: ${paths.length} item${paths.length !== 1 ? 's' : ''}`);
                done();
            });
        }
    };
};
