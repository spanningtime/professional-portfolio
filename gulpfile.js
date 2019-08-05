var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    twig = require('gulp-twig'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    gulp.src('css/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(autoprefix({browsers: ['last 5 version', 'ie 8', 'ie 9']}))
    .pipe(minifycss({compatibility: 'ie8'}))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    gulp.src('js/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('js/min/'))
   // .pipe(uglify())
    .pipe(gulp.dest('js/min/'))
    .pipe(browserSync.stream());
});

gulp.task('includes', function() {
    return gulp.src('layout.twig')
        .pipe(twig())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch('css/**/**/*', ['sass']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch("**/*.twig", ['includes']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('browser-sync', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('default', ['watch', 'browser-sync']);
