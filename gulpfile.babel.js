import gulp from 'gulp';
import del from 'del';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import imagemin from 'gulp-imagemin';
import connect from 'gulp-connect';
import changed from 'gulp-changed';

const clean = () => del('dist');
export { clean };

export function views() {
    return gulp.src('src/app/views/*.pug')
        .pipe(changed('dist'))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
}

//TODO: Add Autoprefixer (last 2 versions, IE11)
export function styles() {
    return gulp.src('src/app/assets/stylesheets/application.scss')
        .pipe(changed('dist/css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
}

//TODO: Add linter
export function scripts() {
    return gulp.src([
            'src/app/assets/javascripts/**/*.js',
            '!src/app/assets/javascripts/vendor/**/*.js'
        ])
        .pipe(changed('dist/js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
}

export function fonts() {
    return gulp.src('src/app/assets/fonts/**/*.{woff,woff2}') // http://caniuse.com/#search=woff, http://caniuse.com/#search=woff2
        .pipe(gulp.dest('dist/fonts'));
}

export function images() {
    return gulp.src('src/app/assets/images/**/*.{gif,jpg,jpeg,png,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
}

export function vendors() {
    return gulp.src([
        'src/vendor/normalize-css/normalize.css',
        'src/vendor/jquery/dist/jquery.js',
        'src/vendor/svg4everybody/dist/svg4everybody.js',
        'src/app/assets/javascripts/vendor/modernizr-custom.js'
    ])
        .pipe(gulp.dest('dist/vendor'));
}

export function server() {
    connect.server({
        root: 'dist/',
        livereload: true
    });
}

export function watch() {
    gulp.watch('src/app/views/**/*.pug', views);
    gulp.watch('src/app/assets/stylesheets/**/*.scss', styles);
    gulp.watch([
        'src/app/assets/javascripts/**/*.js',
        '!src/app/assets/javascripts/vendor/**/*.js'
    ], scripts);
}

const build = gulp.series(clean, gulp.parallel(views, styles, scripts, fonts, images, vendors, server, watch));

export { build }

export default build;
