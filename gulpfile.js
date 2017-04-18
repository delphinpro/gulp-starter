/**
 * Gulpfile
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

"use strict";

const _serverPort  = 3000;
const _useProxy    = false;
const _localDomain = '';
const _browsers    = [];
const _src         = 'source/';
const _build       = 'public_html/';

let config = {

    root: {
        src  : _src,
        build: _build
    },

    watchableTasks: ['twig', 'es6', 'scss', 'images', 'fonts'],

    defaultTasks: [['sprite:svg'], ['assets'], ['twig', 'vendor', 'es6', 'scss', 'images', 'fonts']],

    scss: {
        src         : 'sass',
        build       : 'design/css',
        sass        : {outputStyle: 'nested'},
        autoprefixer: {
            browsers: ['last 5 versions', 'ie 8-9']
        },
        extensions  : ['scss'],
        resolver    : {
            source     : '/design/images/',
            replacement: '../images/'
        }
    },

    es6: {
        src       : 'js',
        build     : 'design/js',
        order     : [],
        filename  : 'build.js',
        extensions: ['js']
    },

    js: {
        src       : 'js',
        build     : 'design/js',
        order     : [],
        filename  : 'build.js',
        extensions: ['js']
    },

    twig: {
        src           : 'twig',
        build         : './',
        dataFile      : 'data.json',
        extensions    : ['twig', 'html', 'json'],
        excludeFolders: ['layouts', 'parts', 'data']
    },

    images: {
        src       : "images",
        build     : "design/images",
        extensions: ["jpg", "png", "svg", "gif"]
    },

    sprite: {
        svg: {
            src : "source/sprites/svg/*.svg",
            dest: "../svg-sprite.svg",
        },
    },

    fonts: {
        src       : "fonts",
        build     : "design/fonts",
        extensions: ["woff2", "woff", "eot", "ttf", "svg"]
    },

    // http://www.browsersync.io/docs/options/
    browserSync: {
        watchOptions  : {ignoreInitial: true},
        files         : ['' + _build + '**/*.*', '!' + _build + '**/*.map'],
        browser       : _browsers,
        notify        : true,
        startPath     : '/',
        proxy         : _localDomain,
        port          : _serverPort,
        reloadDebounce: 500,
        ghostMode     : {
            clicks: true,
            forms : true,
            scroll: false
        }
    }
};

if (!_useProxy) {
    config.browserSync.proxy  = null;
    config.browserSync.server = {
        baseDir  : _build,
        directory: true
    };
}

module.exports = config;


/////////////////////////////////////////////////

global.production = process.env.NODE_ENV === 'production';

const requireDir = require('require-dir');
requireDir('./gulp/tasks', {recurse: true});
