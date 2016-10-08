var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();


//watch
gulp.task('watch', ['default'], function() {
    gulp.watch('lib/**/*', ['default']);
});


//default
gulp.task('default', ['styles', 'js', 'html']);


//////////////////

/*
Styles
 */
const baseConfig = {
    baseDir: 'static/',
    maxSize: 14 * 1024,
    debug: false
};

//merged css
gulp.task('styles', ['styles_single'], function() {
    return gulp.src(['lib/styles/main/*.less', 'lib/styles/main/*.css'])
        .pipe($.sourcemaps.init())
        .pipe($.concat('main.css'))
        .pipe($.less())
        .pipe($.inlineBase64(baseConfig))
        .pipe($.autoprefixer({
            browsers: ['> 5%']
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'));
});

//single css files
gulp.task('styles_single', function() {
    return gulp.src(['lib/styles/*.less', 'lib/styles/*.css'])
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.inlineBase64(baseConfig))
        .pipe($.autoprefixer({
            browsers: ['> 5%']
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'));
});


/*
js
 */
gulp.task('js', function() {
    return gulp.src('lib/js/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        //.pipe($.concat('main.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});


/*
html
 */
gulp.task('html', ['styles', 'js'], function() {
    return gulp.src('lib/index.html')
        .pipe($.inlineSource({rootpath:'.'}))
        .pipe($.htmlmin({
            collapseWhitespace: true,
            sortAttributes: true
        }))
        .pipe(gulp.dest('.'));
});
