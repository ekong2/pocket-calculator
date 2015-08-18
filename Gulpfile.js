'use strict';

var gulp      = require('gulp'),
    nodemon   = require('gulp-nodemon'),
    bs        = require('browser-sync'),
    reload    = bs.reload

// the paths to our app files
var paths = {
  // all our client app js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css']
};

// live reload any changes made
gulp.task('start', ['serve'],function () {
  bs({
    notify: true,
    // address for server,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:8000'
  });
});

// start our node server using nodemon
gulp.task('serve', function() {
  nodemon({script: 'index.js', ignore: 'node_modules/**/*.js'});
});

gulp.task('default', ['start']);
