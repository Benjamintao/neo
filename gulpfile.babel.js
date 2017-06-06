// Import
import modernizr from '@thasmo/gulp-modernizr'; // https://www.npmjs.com/package/gulp-modernizr is abandoned
import autoprefixer from 'autoprefixer';
import del from 'del';
import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import connect from 'gulp-connect';
import imagemin from 'gulp-imagemin';
import postcss from 'gulp-postcss';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';

// Paths
const config = require('./gulpfile.config.json');

// Clean
const clean = () => del(config.paths.dist.root);
export { clean };

// Views
export function views() {
    return gulp.src(config.paths.src.views.build, {since: gulp.lastRun(views)})
        .pipe(pug(config.options.pug))
        .pipe(gulp.dest(config.paths.dist.root))
        .pipe(connect.reload());
}

// Styles
// outputStyle: :nested, :expanded, :compact, :compressed
export function styles() {
    return gulp.src(config.paths.src.styles.build, {since: gulp.lastRun(styles)})
        .pipe(sass(config.options.sass))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(connect.reload());
}

// Modernizr
// Tests: https://github.com/Modernizr/Modernizr/tree/master/feature-detects
export function modernizrBuild() {
    return gulp.src(config.paths.src.modernizr)
        .pipe(modernizr(config.options.modernizr))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.dist.js));
}

// Vendors
export function vendorScripts() {
    return gulp.src(config.paths.src.vendorScripts)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.dist.js));
}

// Scripts
// No gulp.lastRun because of bundle build
export function scripts() {
    return gulp.src(config.paths.src.scripts.build)
        .pipe(babel(config.options.babel))
        .pipe(concat('application.js'))
        .pipe(gulp.dest(config.paths.dist.js))
        .pipe(connect.reload());
}

// Fonts
// Extensions: http://caniuse.com/#search=woff, http://caniuse.com/#search=woff2
export function fonts() {
    return gulp.src(config.paths.src.fonts, {since: gulp.lastRun(fonts)})
        .pipe(gulp.dest(config.paths.dist.fonts))
        .pipe(connect.reload());
}

// Images
export function images() {
    return gulp.src(config.paths.src.images, {since: gulp.lastRun(images)})
        .pipe(imagemin(config.options.imagemin))
        .pipe(gulp.dest(config.paths.dist.img))
        .pipe(connect.reload());
}

// Files
export function files() {
    return gulp.src(config.paths.src.files, {since: gulp.lastRun(files)})
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
    gulp.watch(config.paths.src.views.watch, views);
    gulp.watch(config.paths.src.styles.watch, styles);
    gulp.watch(config.paths.src.scripts.watch, scripts);
    gulp.watch(config.paths.src.fonts, fonts);
    gulp.watch(config.paths.src.images, images);
    gulp.watch(config.paths.src.files, files);
}

// Build
const build = gulp.series(clean, gulp.parallel(views, styles, modernizrBuild, vendorScripts, scripts, fonts, images, files, connectServer, watch));

export { build }

export default build;
