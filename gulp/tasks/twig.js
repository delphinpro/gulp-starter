/**
 * Gulp-task. Build HTML.
 *
 * @since        10.04.2015 13:20
 * @license      Licensed under the MIT license
 */

const config = require('../../gulpfile');
if (!config.twig) return;

const fs        = require('fs');
const path      = require('path');
const bs        = require('browser-sync').create();
const gulp      = require('gulp');
const data      = require('gulp-data');
const twig      = require('gulp-twig');
const changed   = require('gulp-changed-in-place');
const tools     = require('../lib/tools');
const notify    = require('../lib/handleErrors');
const functions = require('../functions');

let exclude    = path.normalize('!**/{' + config.twig.excludeFolders.join(',') + '}/**');
let extensions = config.twig.extensions.filter(function (item) {
    return item !== 'json';
});

const paths = {
    src  : [
        path.join(config.root.src, config.twig.src, tools.mask(extensions)),
        exclude
    ],
    build: path.join(config.root.build, config.twig.build)
};

function getData() {
    let dataPath = path.resolve(config.root.src, config.twig.src, config.twig.dataFile);
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

gulp.task('twig', function () {
    return gulp.src(paths.src)
        .pipe(data(getData))
        .on('error', notify)
        .pipe(twig({
            base     : [path.join(config.root.src, config.twig.src)],
            functions: functions
        }))
        .on('error', notify)
        .pipe(changed({firstPass: true}))
        .pipe(gulp.dest(paths.build))
        .pipe(bs.stream());
});
