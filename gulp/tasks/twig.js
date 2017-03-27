/**
 * Gulp-task. Build HTML.
 *
 * @since        10.04.2015 13:20
 * @license      Licensed under the MIT license
 */

const config = require('../config');
if (!config.twig) return;

const fs           = require('fs');
const path         = require('path');
const browserSync  = require('browser-sync');
const gulp         = require('gulp');
const data         = require('gulp-data');
const twig         = require('gulp-twig');
const changed      = require('gulp-changed-in-place');
const handleErrors = require('../lib/handleErrors');
const functions    = require('../functions');

let exclude    = path.normalize('!**/{' + config.twig.excludeFolders.join(',') + '}/**');
let extensions = config.twig.extensions.filter(function (item) {
    return item !== 'json';
});

const paths = {
    src  : [
        path.join(config.root.src, config.twig.src, '/**/*.{' + extensions + '}'),
        exclude
    ],
    build: path.join(config.root.build, config.twig.build)
};

function getData(file) {
    let dataPath = path.resolve(config.root.src, config.twig.src, config.twig.dataFile);
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

gulp.task('twig', function () {
    return gulp.src(paths.src)
        .pipe(data(getData))
        .on('error', handleErrors)
        .pipe(twig({
            base     : [path.join(config.root.src, config.twig.src)],
            functions: functions
        }))
        .on('error', handleErrors)
        .pipe(changed({firstPass: true}))
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream());
});
