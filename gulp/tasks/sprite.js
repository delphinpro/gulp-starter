/**
 * Gulp-task. Build SVG sprites.
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const path      = require('path');
//const bs        = require('browser-sync').create();
const gulp      = require('gulp');
const svgmin    = require('gulp-svgmin');
const cheerio   = require('gulp-cheerio');
const replace   = require('gulp-replace');
const svgSprite = require('gulp-svg-sprite');

module.exports = function(options) {

  let build = path.join(options.root.build, options.images.build);

  return function() {
    return gulp.src(options.sprite.svg.src)
    .pipe(svgmin({
      js2svg: {pretty: true},
    }))
    .pipe(cheerio({
      run          : function($) {
        $('title').remove();
        // $('[fill]').removeAttr('fill');
        // $('[stroke]').removeAttr('stroke');
        $('[stroke="#000"]').removeAttr('stroke');
        $('[stroke="#000000"]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true},
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    .pipe(replace('&amp;gt;', '>'))
    .pipe(svgSprite({
      shape: {transform: []},
      mode : {
        symbol: {
          sprite: options.sprite.svg.dest,
          render: {
            scss: {
              dest    : '../../../../source/sass/_svg-icons.scss',
              template: 'source/templates/svg-icons.scss.mustache',
            },
            // twig: {
            //     dest    : "../../../../source/twig/parts/ui/ui-sprites.twig",
            //     template: "source/templates/svg-icons.twig.mustache"
            // }
          },
        },
      },
    }))
    .pipe(gulp.dest(build))
        ;
  };
};
