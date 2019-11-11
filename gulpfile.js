var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var cssnano     = require('gulp-cssnano');
var htmlmin     = require('gulp-htmlmin');
var imagemin    = require('gulp-imagemin');
var sourcemaps  = require('gulp-sourcemaps');
var connect     = require('gulp-connect');
var handlebars  = require('gulp-handlebars');
var wrap        = require('gulp-wrap');
var declare     = require('gulp-declare');
var cache       = require('gulp-cache');
var del         = require('del');

// Tasks 

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 8001,
        livereload: true
    });
});

gulp.task('watch', function() {
	gulp.watch('app/css/*.css', ['css']);
	gulp.watch('app/*.html', ['html']);
  gulp.watch('app/templates/*.handlebars', ['templates']);
	gulp.watch('app/js/*.js', ['js']);
});

gulp.task('js', function() {	
	return gulp.src('app/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src('app/css/*.css')
 		.pipe(sourcemaps.init())
  	.pipe(concat('style.css'))
  	.pipe(cssnano())
  	.pipe(sourcemaps.write())
  	.pipe(gulp.dest('dist/css'))
  	.pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src('app/img/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'))
});

gulp.task('videos', function() {
  gulp.src('app/img/*.+(mp4)')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('html', function() {
  gulp.src(['app/**/*.html'])
  		.pipe(htmlmin({
				collapseWhitespace: true,
				removeComments: true
			}))
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
});

gulp.task('templates', function() {
  gulp.src('app/templates/*.handlebars')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'ellomix.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
})

// Build Sequences

gulp.task('default', ['clean:dist', 'html', 'templates', 'css', 'images', 'videos', 'js', 'connect', 'watch']);
gulp.task('build', ['clean:dist', 'html', 'templates', 'css', 'images', 'videos', 'js']);