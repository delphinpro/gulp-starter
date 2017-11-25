/**
 * Gulpfile
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const config          = require('./gulp.config.js');
const lazyRequireTask = require('./gulp/lib/lazyRequireTask');

global.ROOT        = __dirname;
global.production  = process.env.NODE_ENV === 'production';
global.development = !global.production;

lazyRequireTask('default', 'scenario', {
  tasks       : config.defaultTasks.concat([['watch', 'browserSync']]),
  instanceName: config.bs.instance,
});
lazyRequireTask('development', 'scenario', {
  tasks       : config.shortListTasks.concat([['watch', 'browserSync']]),
  instanceName: config.bs.instance,
});
lazyRequireTask('build', 'scenario', {tasks: config.defaultTasks});
lazyRequireTask('bower', 'scenario', {tasks: [['bower:js', 'bower:css']]});
lazyRequireTask('frontend-tools', 'scenario', {tasks: [['frontend-tools:js', 'frontend-tools:misc']]});
lazyRequireTask('clean', 'clean', config);
lazyRequireTask('clean:preview', 'clean', config, {preview: true});
lazyRequireTask('copy', 'copy', config);

lazyRequireTask('scss', 'scss', config);
lazyRequireTask('twig', 'twig', config);
lazyRequireTask('images', 'images', config);
lazyRequireTask('fonts', 'fonts', config);
lazyRequireTask('sprite', 'sprite', config);
lazyRequireTask('webpack', 'webpack', config);
lazyRequireTask('webpack:vendor', 'webpack.vendor', config);
lazyRequireTask('docs', 'docs', config);

lazyRequireTask('bower:js', 'bower.js', config);
lazyRequireTask('bower:css', 'bower.css', config);

lazyRequireTask('frontend-tools:js', 'frontend-tools.js', config);
lazyRequireTask('frontend-tools:misc', 'frontend-tools.misc', config);

lazyRequireTask('watch', 'watch', config);
lazyRequireTask('browserSync', 'browser-sync', config);
