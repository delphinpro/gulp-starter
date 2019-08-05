/*!
 * gulp-starter
 * Resolve url to images
 * (c) 2016-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const through = require('through2');

const PLUGIN_NAME = 'resolve-url ';

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new Error(PLUGIN_NAME + 'Streaming not supported'));
            return;
        }

        try {
            let content = file.contents.toString();

            if (/\.css$/.exec(file.path) !== null) {
                if (/url\("(.+?)"\)/.exec(content) !== null) {
                    let match;
                    const pattern = /url\("(.+?)"\)/g;

                    while ((match = pattern.exec(content)) !== null) {
                        let found  = match[1];
                        let result = found.replace(options.source, options.replacement);
                        content    = content.replace(found, result);
                    }

                    file.contents = Buffer.from(content);
                }
            }

            if (/\.html$/.exec(file.path) !== null) {
                if (/src="([^"]+?)"/.exec(content) !== null
                    || /srcset="([^"]+?)"/.exec(content) !== null
                ) {
                    let match;
                    const pattern  = /src="([^"]+?)"/g;
                    const pattern2 = /srcset="([^"]+?)"/g;

                    while ((match = pattern.exec(content)) !== null) {
                        let found  = match[1];
                        let result = found.replace(options.source, options.replacement);
                        content    = content.replace(found, result);
                    }

                    let src2 = new RegExp(options.source, 'g');
                    while ((match = pattern2.exec(content)) !== null) {
                        let found  = match[1];
                        let result = found.replace(src2, options.replacement);
                        content    = content.replace(found, result);
                    }

                    file.contents = Buffer.from(content);
                }
            }
        } catch (err) {
            this.emit('error', new Error(PLUGIN_NAME + err.message));
        }

        this.push(file);
        cb();
    });
};
