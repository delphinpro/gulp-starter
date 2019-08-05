/*!
 * gulp-starter
 * Task. Make minified and concatenated css/js files
 * (c) 2018-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const path   = require('path');
const gulp   = require('gulp');
const concat = require('gulp-concat');

const tools  = require('../lib/tools');
const config = require('../../gulp.config');

function concatFiles(source, destination, destinationName) {
    return new Promise((resolve, reject) => {

        gulp.src(source)
            .pipe(concat(destinationName))
            .pipe(gulp.dest(destination))
            .on('error', reject)
            .on('end', resolve);

    });
}

module.exports = function () {

    let sourcePath = path.join(config.root.main, tools.getTempDirectory());
    let destPath   = path.join(config.root.main, config.root.dist);

    tools.info(`Dist source path:      ${sourcePath}`);
    tools.info(`Dist destination path: ${destPath}`);

    return function (done) {

                let promises = [];

                config.dist.forEach(pack => {
                    if (typeof pack === 'string') {
                        let source   = path.join(sourcePath, pack);
                        promises.push(concatFiles(source, destPath, pack));
                    } else if (Array.isArray(pack)) {
                        let source = pack[1].map(item => path.join(sourcePath, item));
                        promises.push(concatFiles(source, destPath, pack[0]));
                    }
                });

                Promise
                    .all(promises)
                    .then(() => done())
                    .catch(err => done(err));
    };
};
