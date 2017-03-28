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

    watchableTasks: ['twig', 'js', 'scss', 'images', 'fonts'],

    defaultTasks: [['twig', 'js', 'scss', 'images', 'fonts']],

    scss: {
        src         : 'sass',
        build       : 'design/css',
        sass        : {},
        autoprefixer: {
            browsers: ['last 5 versions', 'ie 8-9']
        },
        extensions  : ['scss'],
        resolver    : {
            source     : '/design/images/',
            replacement: '../images/'
        }
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

    fonts: {
        src       : "fonts",
        build     : "design/fonts",
        extensions: ["woff2", "woff", "eot", "ttf", "svg"]
    },

    // http://www.browsersync.io/docs/options/
    browserSync: {
        files    : [_build + '**/*.css', _build + '**/*.html'],
        browser  : _browsers,
        notify   : true,
        startPath: '/',
        proxy    : _localDomain,
        port     : _serverPort,
        ghostMode: {
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
