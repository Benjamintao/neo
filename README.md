# Neo

### Gulp 4
##### Install
Node already supports a lot of **ES2015**, to avoid compatibility problem we suggest to install Babel and rename your `gulpfile.js` as `gulpfile.babel.js`.
```sh
npm install --save-dev babel-register babel-preset-es2015
```
Then create a **.babelrc** file with the preset configuration.
```js
{
  "presets": [ "es2015" ]
}
```

### gulp-babel
##### Install
```
$ npm install --save-dev gulp-babel babel-preset-env
```
##### Usage
```js
const gulp = require('gulp');
const babel = require('gulp-babel');
gulp.task('default', () =>
	gulp.src('src/app.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('dist'))
);
```
