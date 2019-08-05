/*!
 * gulp-starter
 * User functions for twig compiler
 * (c) 2016-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const fs   = require('fs');
const path = require('path');

const tools       = require('../lib/tools');
const config      = require('../../gulp.config.js');
const DEVELOPMENT = require('../lib/checkMode').isDevelopment();

module.exports.functions = [
];

module.exports.loadData = function () {
    const dataPath = path.resolve(config.root.src, config.twig.dataFile);
    let customData = {};

    if (fs.existsSync(dataPath)) {
        customData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } else {
        tools.warn('Data file NOT FOUND: ' + dataPath);
    }

    return {
        system: {
            development: DEVELOPMENT,
            options    : config,
            config     : config,
        },
        ...customData,
    };
};

module.exports.extendFunction = function (Twig) {
    Twig.exports.extendTag({
        type : 'srccode',
        regex: /^srccode$/,
        next : ['endsrccode'],

        open: true,

        compile: function (token) {
            var expression = token.match[0];

            token.stack = Twig.expression.compile.apply(this, [
                {
                    type : Twig.expression.type[expression],
                    value: expression,
                },
            ]).stack;

            delete token.match;
            return token;
        },

        parse: function (token, context, chain) {
            //let level  = Twig.expression.parse.apply(this, [token.stack, context]);
            let output = '';

            let s   = token.output[0].value;
            let arr = s.split('\n')
                .map(item => item.replace(/\r/g, ''))
                .filter(item => item.trim());
            let len = 999;
            arr.forEach(item => {
                let l = item.length - item.trimLeft().length;
                if (l < len) len = l;
            });
            arr = arr.map(item => {
                let trimmed = item.trimLeft();
                let l       = item.length - trimmed.length;
                return trimmed.padStart(l - len + trimmed.length);
            });
            s   = arr.join('\r\n');

            token.output[0].value =
                '<pre class="demo-src-code">' +
                // token.output[0].value
                s
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                + '</pre>'
            ;
            // console.log('out', token.output);
            output                = Twig.parse.apply(this, [token.output, context]);

            return {
                chain : chain,
                output: output,
            };
        },
    });

    Twig.exports.extendTag({
        type : 'endsrccode',
        regex: /^endsrccode$/,
        next : [],
        open : false,
    });
};
