/**
 * User function for twig compiler.
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2016-2017 delphinpro
 * @license     licensed under the MIT license
 */

const config = require('../gulp.config.js');

// take from php.js library
function uniqueId(prefix, moreEntropy) {
    let retId;
    moreEntropy      = !!moreEntropy;
    const formatSeed = function (seed, reqWidth) {
        seed = parseInt(seed, 10).toString(16); // to hex str
        if (reqWidth < seed.length) {
            // so long we split
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) {
            // so short we pad
            return Array(1 + (reqWidth - seed.length)).join('0') + seed;
        }
        return seed;
    };

    if (!this.php_js) {
        this.php_js = {};
    }
    if (!this.php_js.uniqidSeed) {
        this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    }
    this.php_js.uniqidSeed++;

    retId = prefix || '';
    retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
    retId += formatSeed(this.php_js.uniqidSeed, 5);

    if (moreEntropy) { /* *** */
        // for more entropy we add a float lower to 10
        retId += (Math.random() * 10).toFixed(8).toString();
    }

    return retId;
}

function pixelGlass(points) {
    if (typeof  points !== 'object') {
        console.warn('Invalid param type for pixelGlass()');
        return '';
    }

    let bp,
        s = `<!-- Pixel Glass. Удалить эти стили. Нужны только для верстальщика! -->\n<style>\n`;

    for (bp of Object.keys(points)) {
        if (bp === '_keys') continue;
        s += `@media(min-width:${bp}){html[data-on="on"]{background:url("${points[bp]}") no-repeat 50% 0;}}\n`;
    }

    s += `</style><!-- // Pixel Glass -->\n`;

    return s;
}

function includeStylesheet(filename, suffix = '.min') {
    filename = global.development ? filename : filename + suffix;
    return `<link href="/${config.scss.build.replace(/\\/g, '/')}/${filename}.css?v=${uniqueId()}"  rel="stylesheet">`;
}

function includeJavascript(filename, suffix = '.min') {
    filename = global.development ? filename : filename + suffix;
    return `<script src="/${config.webpack.build.replace(/\\/g, '/')}/${filename}.js?v=${uniqueId()}"></script>`;
}

module.exports = [
    {name: 'pixelGlass', func: pixelGlass},
    {name: 'uniqueId', func: uniqueId},
    {name: 'includeStylesheet', func: includeStylesheet},
    {name: 'includeJavascript', func: includeJavascript},
];
