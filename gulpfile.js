const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');

gulp.task('jsdoc', (cb) => {
  gulp.src(['./**/*.js', '!./node_modules/**/*.js'], { read: false })
    .pipe(jsdoc(cb));
});
