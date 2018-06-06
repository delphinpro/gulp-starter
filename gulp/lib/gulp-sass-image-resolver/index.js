/**
 * Image src resolver
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2016 delphinpro
 * @license     licensed under the MIT license
 */

const gulpUtil = require('gulp-util');
const through  = require('through2');

const PLUGIN_NAME = 'gulp-sass-image-resolver';

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gulpUtil.PluginError(PLUGIN_NAME,
                'Streaming not supported'));
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

                    file.contents = new Buffer(content);
                }
            }

            if (/\.html$/.exec(file.path) !== null) {
                if (/src="([^"]+?)"/.exec(content) !== null) {
                    let match;
                    const pattern = /src="([^"]+?)"/g;

                    while ((match = pattern.exec(content)) !== null) {
                        let found  = match[1];
                        let result = found.replace(options.source, options.replacement);
                        content    = content.replace(found, result);
                    }

                    file.contents = new Buffer(content);
                }
            }
        } catch (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, err));
        }

        this.push(file);
        cb();
    });
};
