/*!
 * gulp-starter
 * Main configuration
 * (c) 2017-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

'use strict';
const path = require('path');

/*==
 *== Main settings
 *== ===================================================================== ==*/

const _serverPort     = 3000;
const _useProxy       = false;
const _localDomain    = '';
const _browsers       = ['chrome'];
const _reloadDebounce = 300;
const root            = {
    src      : 'source',
    build    : 'public_html',
    dist     : 'dist',
    staticDir: 'design',
};

let config = {
    root,
    sprite: {},
};

/*==
 *== Task lists
 *== ===================================================================== ==*/

config.watchableTasks = [
    'twig',
    'webpack',
    'scss',
    'images',
    'fonts',
    'copy',
];

config.defaultTasks = [
    ['clean'],
    [
        'docs',
        'frontend-tools',
        'copy',
        'bower',
    ],
    ['sprite'],
    ['webpack:vendor'],
    [
        'twig',
        'webpack',
        'scss',
        'images',
        'fonts',
    ],
];

config.shortListTasks = [['twig', 'webpack', 'scss']];

/*==
 *== Sass build settings
 *== ===================================================================== ==*/

config.scss = {
    src       : 'sass',
    build     : path.join(root.staticDir, 'css'),
    sass      : {
        outputStyle: 'compressed', // In production mode. In development mode always is 'nested'
    },
    extensions: ['scss'],
    resolver  : {
        source     : '/source/',
        replacement: '../',
    },
};

/*==
 *== Autoprefixer settings
 *== ===================================================================== ==*/

config.autoprefixer = {
    browsers: ['last 3 versions', 'ie 11'],
};

/*==
 *== Main javascript build settings
 *== ===================================================================== ==*/

config.javascript = {
    processor: 'webpack',
};

/*==
 *== Javascript processing of webpack
 *== ===================================================================== ==*/

config.webpack = {
    src       : 'js',
    build     : path.join(root.staticDir, 'js'),
    entryExt  : 'js',
    extensions: ['js', 'scss', 'css', 'vue'],
};

/*==
 *== Bower settings
 *== ===================================================================== ==*/

config.bower = {
    src: 'bower.json',
    js : {
        build : path.join(root.staticDir, 'js'),
        output: 'bower.vendor.js',
    },
    css: {
        build : path.join(root.staticDir, 'css'),
        output: 'vendor.css',
    },
};

/*==
 *== Twig processing settings for templates
 *== ===================================================================== ==*/

config.twig = {
    src           : 'twig',
    build         : '',
    dataFile      : 'data.json',
    extensions    : ['twig', 'html', 'json'],
    excludeFolders: ['layouts', 'parts'],
    resolver      : {
        source     : '/source/',
        replacement: '/',
    },
};

/*==
 *== Image optimization settings
 *== ===================================================================== ==*/

config.images = {
    src       : 'images',
    build     : path.join(root.staticDir, 'images'),
    extensions: ['jpg', 'png', 'svg', 'gif'],
};

/*==
 *== Sprite generation settings
 *== ===================================================================== ==*/

config.sprite.svg = {
    src : 'source/sprites/svg/*.svg',
    dest: '../svg-sprite.svg',
};

/*==
 *== Font copy settings
 *== ===================================================================== ==*/

config.fonts = {
    src       : 'fonts',
    build     : path.join(root.staticDir, 'fonts'),
    extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg'],
};

/*==
 *== Cleaning settings
 *==
 *== root    Начальная (корневая) директория для удаления файлов и папок
 *==         По умолчанию равна config.root.build
 *== exclude Директории без оконечных слешей, слеш прямой, от root
 *==         Одиночные файлы
 *==
 *== Можно задавать массив объектов для очистки нескольких директорий
 *==         [{root:'/dir1/',exclude:[]}, {root:'/docs/',exclude:[]}]
 *== ===================================================================== ==*/

config.cleaning = [
    {
        root   : '/design/',
        exclude: [],
    },
    {
        root   : '/docs/',
        exclude: [],
    },
];

/*==
 *== Copy settings
 *== ===================================================================== ==*/

config.copy = {
    src       : ['assets/**'],
    extensions: ['php', 'ico', 'jpg', 'png', 'txt', 'htaccess'],
};

/*==
 *== BrowserSync settings
 *== http://www.browsersync.io/docs/options/
 *== ===================================================================== ==*/

config.browserSync = {
    watchOptions   : {ignoreInitial: true},
    // files          : ['' + root.build + '**/*.*', '!' + root.build + '**/*.map'],
    browser        : _browsers,
    notify         : true,
    startPath      : '/',
    proxy          : _localDomain,
    port           : _serverPort,
    reloadDebounce : _reloadDebounce,
    reloadOnRestart: true,
    ghostMode      : {
        clicks: true,
        forms : true,
        scroll: true,
    },
};

config.bs = {
    instance: 'delphinpro',
};

if (!_useProxy) {
    config.browserSync.proxy  = null;
    config.browserSync.server = {
        baseDir  : root.build,
        directory: true,
    };
}

module.exports = config;
