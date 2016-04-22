/**
 * Gulp-task. Build HTML.
 *
 * @since        10.04.2015 13:20
 * @license      Licensed under the MIT license
 */

var config = require('../config');
if (!config.html) return;

var browserSync = require('browser-sync');
var data = require('gulp-data');
var gulp = require('gulp');
var twig = require('gulp-twig');
var handleErrors = require('../lib/handleErrors');
var path = require('path');
var fs = require('fs');
var functions = require('../functions');

var exclude = path.normalize('!**/{' + config.html.excludeFolders.join(',') + '}/**');
var extensions = config.html.extensions.filter(function(item){
    return item !== 'json';
});

var paths = {
    src  : [
        path.join(config.root.src, config.html.src, '/**/*.{' + extensions + '}'),
        exclude
    ],
    build: path.join(config.root.build, config.html.build)
};

var getData = function (file) {
    var dataPath = path.resolve(config.root.src, config.html.src, config.html.dataFile);
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
};

var htmlTask = function () {

    return gulp.src(paths.src)
        .pipe(data(getData))
        .on('error', handleErrors)
        .pipe(twig({
            base     : [path.join(config.root.src, config.html.src)],
            functions: functions
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream());

};

gulp.task('html', htmlTask);
module.exports = htmlTask;
