// Import
import del from 'del';
import gulp from 'gulp';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import babel from 'gulp-babel';
import modernizr from 'gulp-modernizr';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import connect from 'gulp-connect';
import changed from 'gulp-changed';

// Paths
const config = require('./gulpfile.config.json');

// Clean
const clean = () => del(config.paths.dist.root);
export { clean };

// Views
export function views() {
    return gulp.src(config.paths.src.views)
        .pipe(changed(config.paths.dist.root))
        .pipe(pug(config.options.pug))
        .pipe(gulp.dest(config.paths.dist.root))
        .pipe(connect.reload());
}

// Styles
// outputStyle: :nested, :expanded, :compact, :compressed
export function styles() {
    return gulp.src('src/app/assets/stylesheets/application.scss')
        .pipe(changed(config.paths.dist.css))
        .pipe(sass(config.options.sass))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(connect.reload());
}

// Scripts
export function scripts() {
    return gulp.src('src/app/assets/javascripts/application.babel.js')
        .pipe(changed(config.paths.dist.js))
        .pipe(babel(config.options.babel))
        .pipe(concat('application.js'))
        .pipe(gulp.dest(config.paths.dist.js))
        .pipe(connect.reload());
}

// Modernizr
// Tests: https://github.com/Modernizr/Modernizr/tree/master/feature-detects
export function modernizrBuild() {
    return gulp.src('src/app/assets/javascripts/modernizr.js')
        .pipe(modernizr(config.options.modernizr))
        .pipe(gulp.dest(config.paths.dist.js));
}

// Fonts
// Extensions: http://caniuse.com/#search=woff, http://caniuse.com/#search=woff2
export function fonts() {
    return gulp.src(config.paths.src.fonts)
        .pipe(changed(config.paths.dist.fonts))
        .pipe(gulp.dest(config.paths.dist.fonts))
        .pipe(connect.reload());
}

// Images
export function images() {
    return gulp.src(config.paths.src.images)
        .pipe(changed(config.paths.dist.img))
        .pipe(imagemin())
        .pipe(gulp.dest(config.paths.dist.img))
        .pipe(connect.reload());
}

// Files
export function files() {
    return gulp.src(config.paths.src.files)
        .pipe(changed(config.paths.dist.root))
        .pipe(gulp.dest(config.paths.dist.root))
        .pipe(connect.reload());
}

// Server
export function connectServer() {
    connect.server({
        port: 1111,
        root: config.paths.dist.root,
        livereload: true
    });
}

// Watch
export function watch() {
    gulp.watch(config.paths.src.views, views);
    gulp.watch(config.paths.src.styles, styles);
    gulp.watch(config.paths.src.scripts, scripts);
    gulp.watch(config.paths.src.fonts, fonts);
    gulp.watch(config.paths.src.images, images);
    gulp.watch(config.paths.src.files, files);
}

// Build
const build = gulp.series(clean, gulp.parallel(views, styles, scripts, modernizrBuild, fonts, images, files, connectServer, watch));

export { build }

export default build;
