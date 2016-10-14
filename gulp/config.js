/**
 * Конфигурация gulp-задач.
 *
 * @since        30.06.2015 9:21
 * @author       delphinpro delphinpro@gmail.ru
 * @license      Licensed under the MIT license
 */

var pkg = require('../package.json');

var _serverPort  = 3000;
var _useProxy    = true;
var _localDomain = 'domain.local';
var _browsers    = [];
var _src         = 'source/';
var _build       = 'public_html/';

var config = {

    root: {
        src  : _src,
        build: _build
    },

    watchableTasks: ['twig', 'js', 'scss', 'images', 'fonts'],

    defaultTasks: ['twig', 'js', 'scss', 'images', 'fonts'],

    scss: {
        src         : 'sass',
        build       : 'design/css',
        sass        : {},
        autoprefixer: {
            browsers: ['last 5 versions', 'ie 8-9']
        },
        extensions  : ['sass', 'scss', 'css'],
        resolver: {
            source     : '/design/images/',
            replacement: '../images/'
        }
    },

    js: {
        src       : 'js',
        build     : 'design/js',
        extensions: ['js', 'json']
    },

    twig: {
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
        proxy    : _localDomain,
        port     : _serverPort,
        ghostMode: {
            clicks: true,
            forms : true,
            scroll: false
        }
    },

    docHeader: '/*! ' + pkg.name + ' v' + pkg.version + ' */\n'

};

if (!_useProxy) {
    config.browserSync.proxy  = null;
    config.browserSync.server = {
        baseDir  : _build,
        directory: true
    };
}

module.exports = config;
