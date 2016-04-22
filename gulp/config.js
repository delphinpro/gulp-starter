/**
 * Конфигурация gulp-задач.
 *
 * @since        30.06.2015 9:21
 * @author       delphinpro delphinpro@gmail.ru
 * @license      Licensed under the MIT license
 */

var pkg = require('../package.json');

var _localDomain = 'domain.local';
var _browsers = [];
var _src = 'source/';
var _build = 'public_html/';

module.exports = {

    root: {
        src  : _src,
        build: _build
    },

    watchableTasks: ['html', 'js', 'css', 'fonts'],

    defaultTasks: ['html', 'js', 'css', 'fonts'],

    css: {
        src         : 'sass',
        build       : 'design/css',
        sass        : {},
        autoprefixer: {
            browsers: ['last 5 versions', 'ie 8-9']
        },
        extensions  : ['sass', 'scss', 'css']
    },

    js: {
        src       : 'js',
        build     : 'design/js',
        extensions: ['js', 'json']
    },

    html: {
        src           : 'twig',
        build         : './',
        dataFile      : 'data.json',
        extensions    : ['twig', 'html', 'json'],
        excludeFolders: ['layouts', 'parts', 'data']
    },

    images: {
        "src"       : "images",
        "build"     : "design/images",
        "extensions": ["jpg", "png", "svg", "gif"]
    },

    fonts: {
        "src"       : "fonts",
        "build"     : "design/fonts",
        "extensions": ["woff2", "woff", "eot", "ttf", "svg"]
    },

    // http://www.browsersync.io/docs/options/
    browserSync: {
        browser  : _browsers,
        notify   : false,
        startPath: '/',
        proxy    : _localDomain
    },

    docHeader: '/*! ' + pkg.name + ' v' + pkg.version + ' */\n'

};
