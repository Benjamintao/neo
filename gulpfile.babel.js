import del from 'del';
import gulp from 'gulp';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import concat from 'gulp-concat';
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

export function styles() {
    return gulp.src('src/app/assets/stylesheets/application.scss')
        .pipe(changed('dist/css'))
        .pipe(sass({
            outputStyle: 'expanded' // :nested, :expanded, :compact, :compressed
        }))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
}

export function scripts() {
    return gulp.src([
            'src/app/assets/javascripts/config.js',
            'src/app/assets/javascripts/functions.js',
            'src/app/assets/javascripts/variables.js',
            'src/app/assets/javascripts/components/icons.js',
            '!src/app/assets/javascripts/vendor/**/*.js'
        ])
        .pipe(changed('dist/js'))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('application.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
}

export function fonts() {
    return gulp.src('src/app/assets/fonts/**/*.{woff,woff2}') // http://caniuse.com/#search=woff, http://caniuse.com/#search=woff2
        .pipe(changed('dist/img'))
        .pipe(gulp.dest('dist/fonts'))
        .pipe(connect.reload());
}

export function images() {
    return gulp.src('src/app/assets/images/**/*.{gif,jpg,jpeg,png,svg}')
        .pipe(changed('dist/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload());
}

export function vendors() {
    return gulp.src([
        'src/vendor/assets/normalize-css/normalize.css',
        'src/vendor/assets/jquery/dist/jquery.min.js',
        'src/vendor/assets/svg4everybody/dist/svg4everybody.min.js',
        'src/app/assets/javascripts/vendor/modernizr-custom.js'
    ])
        .pipe(gulp.dest('dist/vendor'));
}

export function files() {
    return gulp.src('src/public/**/*')
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
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
    gulp.watch('src/app/assets/fonts/**/*.{woff,woff2}', fonts);
    gulp.watch('src/app/assets/images/**/*.{gif,jpg,jpeg,png,svg}', images);
    gulp.watch('src/public/**/*', files);
}

const build = gulp.series(clean, gulp.parallel(views, styles, scripts, fonts, images, vendors, files, server, watch));

export { build }

export default build;
