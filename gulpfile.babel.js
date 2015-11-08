import gulp  from 'gulp' // ES6 imports!
import babel from 'gulp-babel'

const SOURCE_PATH = 'src/**/*.js'

gulp.task('watch', () => {
  gulp.watch(SOURCE_PATH, ['compile'])
})

gulp.task('compile', () => {
  return gulp.src(SOURCE_PATH)
    .pipe(babel())
    .pipe(gulp.dest('dist'));
})
 
gulp.task('default', ['compile'])

