/*!
 * gulp-starter
 * User functions for sass compiler
 * (c) 2018-2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const fs   = require('fs');
const path = require('path');

const isDevelopment = require('./checkMode').isDevelopment;
const config = require('../../gulp.config');

let types = require('node-sass').types;

const nodeEnv = function (done) {
    let _nodeEnv = isDevelopment() ? 'development' : 'production';
    let data = types.String(_nodeEnv);

    done(data);
};

const b64 = function (file, done) {
    let _file = path.join(config.root.main, file.getValue());
    let _ext  = _file.split('.').pop();

    fs.readFile(_file, function (err, _data) {
        if (err) return done(err);
        let data = new Buffer(_data);
        data     = data.toString('base64');
        data     = 'url(data:image/' + _ext + ';base64,' + data + ')';
        data     = types.String(data);

        done(data);
    });
};

module.exports = {
    'nodeEnv()' : nodeEnv,
    'b64($file)': b64,
};
