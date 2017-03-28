/**
 * gulp-starter
 * @since       28.03.2017 9:26
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const config = require('../../gulpfile');

const fs   = require('fs');
const path = require('path');
const gulp = require('gulp');
const sftp = require('gulp-sftp');

const ftpConfig = JSON.parse(fs.readFileSync(path.resolve('.ftppass'), 'utf8'));

gulp.task('deploy', function () {
    return gulp.src(path.join(config.root.build, '**/*.*'))
        .pipe(sftp({
            host      : ftpConfig.main.host,
            port      : ftpConfig.main.port,
            remotePath: ftpConfig.main.remotePath,
            auth      : 'main',
            callback  : function () {
                console.log('Files uploaded');
            }
        }));
});
