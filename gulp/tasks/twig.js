/**
 * Gulp-task. Build HTML.
 *
 * @since        10.04.2015 13:20
 * @license      Licensed under the MIT license
 */

var config = require('../config');
if (!config.twig) return;

var browserSync  = require('browser-sync');
var data         = require('gulp-data');
var gulp         = require('gulp');
var twig         = require('gulp-twig');
var handleErrors = require('../lib/handleErrors');
var path         = require('path');
var fs           = require('fs');
var functions    = require('../functions');

var exclude    = path.normalize('!**/{' + config.twig.excludeFolders.join(',') + '}/**');
var extensions = config.twig.extensions.filter(function (item) {
    return item !== 'json';
});
var paths      = {
    src  : [
        path.join(config.root.src, config.twig.src, '/**/*.{' + extensions + '}'),
        exclude
    ],
    build: path.join(config.root.build, config.twig.build)
};

var getData = function (file) {
    var dataPath = path.resolve(config.root.src, config.twig.src, config.twig.dataFile);
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
};

var twigTask = function () {

    return gulp.src(paths.src)
        .pipe(data(getData))
        .on('error', handleErrors)
        .pipe(twig({
            //base     : __dirname + '/../../',
            base     : [path.join(config.root.src, config.twig.src)],
            functions: functions
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream());

};

gulp.task('twig', twigTask);
