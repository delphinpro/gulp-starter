/*!
 * gulp-starter
 * Task. Clean build directory
 * (c) 2016-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const fs   = require('fs');
const path = require('path');
const del  = require('del');

const config = require('../../gulp.config.js');
const tools  = require('../lib/tools');

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
    return this.replace(config.root.build, '').replace(re, '/');
};

function printList(caption, list, isPath = false) {
    if (!list.length) {
        tools.info(`${caption} EMPTY`);
        return;
    }

    tools.info(caption);
    list.forEach(item => console.log(`    ${isPath ? item.shortPath() : item}`));
}

module.exports = function (options) {

    if (!Array.isArray(config.cleaning)) {
        config.cleaning = [config.cleaning];
    }

    return function (done) {

        let targets = [];

        for (let index in config.cleaning) {
            if (!config.cleaning.hasOwnProperty(index)) continue;

            let itemOpts  = config.cleaning[index];
            let cleanRoot = config.root.build;

            if (itemOpts.root) {
                if (fs.existsSync(path.join(cleanRoot, itemOpts.root))) {
                    cleanRoot = path.join(cleanRoot, itemOpts.root);
                } else {
                    tools.warn(`Clean task [${index}][${cleanRoot}${itemOpts.root}]: Directory not found.`);
                    continue;
                }
            }

            if (!fs.existsSync(cleanRoot)) {
                tools.warn(`Clean task [${index}]: Nothing to delete.`);
                continue;
            }

            let originalExcludes = normalizePathExcludes(itemOpts.exclude, cleanRoot);
            if (typeof options === 'object' && options.preview) {
                printList(`Clean task [${index}]: Excludes `, originalExcludes, true);
            }

            let fsObjects = scanDir(cleanRoot);
            // printList('File system objects:', fsObjects, true);

            let tmp = fsObjects.filter(item => {
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

        targets = targets.concat(tools.getTempDirectory());

        printList(`Clean directory [ALL]:`, targets, true);

        if (typeof options === 'object' && options.preview) {
            done();
        } else {
            // noinspection JSUnresolvedFunction
            del(targets).then(paths => {
                tools.success(`Removed: ${paths.length} item${paths.length !== 1 ? 's' : ''}`);
                done();
            });
        }
    };
};
