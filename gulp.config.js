/*!
 * gulp-starter
 * Main configuration
 * (c) 2017-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

'use strict';

/*==
 *== Main settings
 *== ===================================================================== ==*/

const _serverPort     = 3000;
const _useProxy       = false;
const _localDomain    = '';
const _startPath      = '/';
const _browsers       = ['chrome'];
const _reloadDebounce = 300;

const root = {
    main  : __dirname,
    src   : 'source',
    build : 'public_html',
    dist  : 'public_html/design/dist',
    static: 'design',
    temp  : '.tmp',
};

const dist = [];

let config = {
    root,
    dist,
};

/*==
 *== Task lists
 *== ===================================================================== ==*/

config.watchableTasks = [
    'twig',
    'scss',
    'javascript',
    'images',
    'copy',
];

/*==
 *== Sass build settings
 *== ===================================================================== ==*/

config.scss = {
    src        : 'sass',
    dest       : 'css',
    extensions : ['scss'],
    sassOptions: {
        outputStyle: 'compressed', // In production mode. In development mode always is 'nested'
    },
    resolveUrl : {
        source     : '/source/',
        replacement: '../',
    },
};

/*==
 *== Main javascript build settings
 *== ===================================================================== ==*/

config.javascript = {
    src       : 'js',
    files     : [
        'header.js',
        'parts/*.js',
        'main.js',
    ],
    build     : `${root.static}/js`,
    extensions: ['js'],
    outputName: 'main.js',
};

/*==
 *== Twig processing settings for templates
 *== ===================================================================== ==*/

config.twig = {
    src       : 'twig',
    build     : '',
    extensions: ['twig', 'html', 'json'],

    dataFile      : 'twig/layouts/data.json',
    excludeFolders: ['layouts', 'parts'],
    resolveUrl    : {
        source     : '/source/',
        replacement: '/design/',
    },
};

/*==
 *== Image optimization settings
 *== ===================================================================== ==*/

config.images = {
    src       : 'images',
    build     : `${root.static}/images`,
    extensions: ['jpg', 'png', 'svg', 'gif'],
};

/*==
 *== Font copy settings
 *== ===================================================================== ==*/

config.fonts = {
    src       : 'fonts',
    build     : `${root.static}/fonts`,
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
        root   : '/',
        exclude: [],
    },
];

/*==
 *== Copy settings
 *== ===================================================================== ==*/

config.copy = [
    { src: 'node_modules/jquery/dist/jquery.min.js', dest: '/design/js' },
    { src: 'node_modules/slick-carousel/slick/slick.min.js', dest: '/design/js' },
    { src: 'node_modules/slick-carousel/slick/slick.css', dest: '/design/css' },
];

/*==
 *== BrowserSync settings
 *== http://www.browsersync.io/docs/options/
 *== ===================================================================== ==*/

config.browserSync = {
    instanceName: 'delphinpro',
    options     : {
        browser        : _browsers,
        notify         : true,
        startPath      : _startPath,
        port           : _serverPort,
        reloadDebounce : _reloadDebounce,
        reloadOnRestart: true,
        ghostMode      : {
            clicks: false,
            forms : true,
            scroll: false,
        },
    },
};

if (_useProxy) {
    config.browserSync.options.proxy = _localDomain;
} else {
    config.browserSync.options.server = {
        baseDir  : root.build,
        directory: true,
        index    : _startPath,
    };
}

module.exports = config;
