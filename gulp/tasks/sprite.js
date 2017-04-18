/**
 * Gulp-task. Build SVG sprites.
 *
 * @license Licensed under the MIT license
 */

const config = require('../../gulpfile');
if (!config.sprite || !config.sprite.svg || !config.images) return;

const path      = require('path');
//const bs        = require('browser-sync').create();
const gulp      = require('gulp');
const svgmin    = require('gulp-svgmin');
const cheerio   = require('gulp-cheerio');
const replace   = require('gulp-replace');
const svgSprite = require('gulp-svg-sprite');


let paths = {
    build: path.join(config.root.build, config.images.build)
};

gulp.task('sprite:svg', function () {
    return gulp.src(config.sprite.svg.src)
        .pipe(svgmin({
            js2svg: {pretty: true}
        }))
        .pipe(cheerio({
            run          : function ($) {
                $('title').remove();
                // $('[fill]').removeAttr('fill');
                // $('[stroke]').removeAttr('stroke');
                $('[stroke="#000"]').removeAttr('stroke');
                $('[stroke="#000000"]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        .pipe(replace('&amp;gt;', '>'))
        .pipe(svgSprite({
            shape: {transform: []},
            mode : {
                symbol: {
                    sprite: config.sprite.svg.dest,
                    render: {
                        scss: {
                            dest    : "../../../../source/sass/_svg-icons.scss",
                            template: "source/templates/svg-icons.scss.mustache"
                        },
                        // twig: {
                        //     dest    : "../../../../source/twig/parts/ui/ui-sprites.twig",
                        //     template: "source/templates/svg-icons.twig.mustache"
                        // }
                    }
                }
            }
        }))
        .pipe(gulp.dest(paths.build))
        ;
});
