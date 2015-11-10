import gulp  from 'gulp' // ES6 imports!
import babel from 'gulp-babel'
import mocha from 'gulp-mocha'

const SOURCES    = 'src/**/*.js'
const TEST_FILES = 'test/**/*.js'

gulp.task('test', () => {
  return gulp.src(TEST_FILES)
             .pipe(babel())
             .pipe(gulp.dest('test_dist'))
             .pipe(mocha({ reporter: 'nyan' }))
})

gulp.task('compile', () => {
  return gulp.src(SOURCES)
             .pipe(babel())
             .pipe(gulp.dest('dist'));
})
 
gulp.task('default', ['compile', 'test'])

gulp.task('watch', (cb) => {
  gulp.watch(SOURCES, ['compile', 'test'])
      .on('end', cb)
})

