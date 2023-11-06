var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var cssnano     = require('gulp-cssnano');
var htmlmin     = require('gulp-htmlmin');
var imagemin    = require('gulp-imagemin');
var sourcemaps  = require('gulp-sourcemaps');
var browsersync = require('browser-sync').create();
var handlebars  = require('gulp-handlebars');
var wrap        = require('gulp-wrap');
var declare     = require('gulp-declare');
var cache       = require('gulp-cache');
var del         = require('del');

// Tasks 

function browserSync() {
  browsersync.init({
      server: {
          baseDir: 'dist'
      },
      port: 8001
  });
}

function watch() {
  gulp.watch('app/css/*.css', css);
  gulp.watch('app/*.html', html);
  gulp.watch('app/templates/*.handlebars', templates);
  gulp.watch('app/js/*.js', js);
}

function js() {
  return gulp.src('app/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(browsersync.stream());
}

function css() {
  return gulp.src('app/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browsersync.stream());
}

function images() {
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'));
}

function videos() {
  return gulp.src('app/img/*.+(mp4)')
    .pipe(gulp.dest('dist/img'));
}

function html() {
  return gulp.src(['app/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream());
}

function templates() {
  return gulp.src('app/templates/*.handlebars')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'ellomix.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browsersync.stream());
}

function clean() {
  return del(['dist']);
}

exports.browserSync = browserSync;
exports.watch       = watch;
exports.js          = js;
exports.css         = css;
exports.images      = images;
exports.videos      = videos;
exports.html        = html;
exports.templates   = templates;
exports.clean       = clean;

// Build Sequences

exports.default = gulp.series(clean, html, templates, css, images, videos, js, browserSync, watch);
exports.build = gulp.series(clean, html, templates, css, images, videos, js);