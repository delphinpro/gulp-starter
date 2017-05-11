/**
 * Gulp-task. Clean build directory.
 *
 * @since        02.04.2015 18:07
 * @license      Licensed under the MIT license
 */

const config = require('../../gulpfile');
if (!config.root.build) return;

const fs   = require('fs');
const path = require('path');
const del  = require('del');
const gulp = require('gulp');

gulp.task('clean', function (done) {

    let targets = [path.join(config.root.build, '*.*')];

    fs.readdirSync(config.root.build).forEach(node => {
        let name = path.join(config.root.build, node);
        if (fs.statSync(name).isDirectory()) {
            targets.push(path.join(name, '**'));
        }
    });
    console.log('Targets', targets);

    del(targets).then(paths => {
        paths.forEach(path => console.log('Remove: ' + path));
        done();
    });

});
