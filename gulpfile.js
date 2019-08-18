var gulp        = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var cssnano     = require('gulp-cssnano');
var imagemin    = require('gulp-imagemin');
var htmlmin     = require('gulp-htmlmin');
var sourcemaps  = require('gulp-sourcemaps');
//var cache       = require('gulp-cache');
var del         = require('del');

// Development Tasks 

gulp.task('browserSync', function() {
 	browserSync({
 		server: {
     		baseDir: 'app'
    	}
 	});
})

gulp.task('watch', function() {
	gulp.watch('app/css/*.css', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
})

// Optimization Tasks

gulp.task('pack-js', function() {	
	return gulp.src('app/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('pack-css', function() {	
	return gulp.src('app/css/*.css')
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'));
});

// gulp.task('images', function() {
// 	return gulp.src('img/*.+(png|jpg|gif|svg)')
// 		.pipe(cache(imagemin()))
// 		.pipe(gulp.dest('dist/img'))
// });

gulp.task('pages', function() {
	return gulp.src(['app/**/*.html'])
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
})

// Build Sequences

gulp.task('default', function(callback) {
	runSequence(
		'clean:dist',
		'browserSync',
		'watch',
		['pack-js', 'pack-css', 'pages'],
		callback
 	)
})

gulp.task('build', function(callback) {
	runSequence(
		'clean:dist',
		['pack-js', 'pack-css', 'pages'],
		callback
	)
})