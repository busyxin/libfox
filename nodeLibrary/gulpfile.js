'use strict';

var autoprefixer = require('gulp-autoprefixer'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    browserSync = require('browser-sync'),
    buffer = require('vinyl-buffer'),
    changed = require('gulp-changed'),
    csso = require('gulp-csso'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    gulp = require('gulp'),
    gulpFilter = require('gulp-filter'),
    jshint = require('gulp-jshint'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    reload = browserSync.reload,
    rename = require("gulp-rename"),
    watchify = require('watchify'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    p = {
      bundle: 'app.js',
      distCss: 'dist/css',
      distJs: 'dist/js',
      jsx: './scripts/app.jsx',
      scss: 'styles/main.scss',
      scssSource: 'styles/*'
    };

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('browserSync', function() {
  browserSync({notify: false, server: {baseDir: './'} })
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify(p.jsx, watchify.args));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(p.bundle))
      .pipe(gulp.dest(p.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(babelify)
    .on('update', rebundle);
  
  return rebundle();
});

gulp.task('browserify', function() {
  browserify(p.jsx)
    .transform(babelify)
    .bundle()
    .pipe(source(p.bundle))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(p.distJs));
});

gulp.task('styles', function() {
  return gulp.src(p.scss)
    .pipe(changed(p.distCss))
    .pipe(sass({errLogToConsole: true}))
    .on('error', notify.onError())
    .pipe(autoprefixer('last 1 version'))
    .pipe(csso())
    .pipe(gulp.dest(p.distCss))
    .pipe(reload({stream: true}));
});

gulp.task('npm-libs', function() {
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(p.distJs));

  gulp.src('./node_modules/materialize-css/bin/materialize.js')
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest(p.distJs));

  gulp.src('./node_modules/normalize.css/normalize.css')
    .pipe(minifycss())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest(p.distCss));
});

gulp.task('lint', function() {
  return gulp.src('./scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watchTask', function() {
  gulp.watch(p.scssSource, ['styles']);
});

gulp.task('watch', ['clean'], function() {
  gulp.start(['npm-libs', 'lint', 'browserSync', 'watchTask', 'watchify', 'styles']);
});

gulp.task('build', ['clean'], function() {
  process.env.NODE_ENV = 'production';
  gulp.start(['npm-libs', 'browserify', 'styles']);
});

gulp.task('default', function() {
  console.log('Run "gulp watch or gulp build"');
});
