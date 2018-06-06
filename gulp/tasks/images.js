/**
 * Gulp-task. Optimize images.
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2015-2017 delphinpro
 * @license     licensed under the MIT license
 */

const path           = require('path');
const bs             = require('browser-sync');
const gulp           = require('gulp');
const changed        = require('gulp-changed');
const imagesOptimize = require('gulp-imagemin');
const tools          = require('../lib/tools');

module.exports = function (options) {

    let src   = path.join(options.root.src, options.images.src, tools.mask(options.images.extensions));
    let build = path.join(options.root.build, options.images.build);

    return function () {
        let bsHasInstance = global.development && bs.has(options.bs.instance);
        let bsInstance;

        if (bsHasInstance) {
            bsInstance = bs.get(options.bs.instance);
        }

        let pipeline = gulp.src([src])
            .pipe(changed(build))
            .pipe(imagesOptimize([
                imagesOptimize.gifsicle(),
                imagesOptimize.jpegtran({
                    progressive: true,
                }),
                imagesOptimize.optipng(),
                imagesOptimize.svgo(),
            ]))
            .pipe(gulp.dest(build));

        if (bsHasInstance) {
            pipeline = pipeline.on('end', function () {
                bsInstance.reload();
            });
        }

        return pipeline;
    };
};
