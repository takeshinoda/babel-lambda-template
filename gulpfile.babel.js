import gulp  from 'gulp'
import babel from 'gulp-babel'
import mocha from 'gulp-mocha'
import file  from 'gulp-file'
import runSequence from 'run-sequence'

import configure from './build_src/configure'

const SOURCES    = 'src/**/*.js'
const TEST_FILES = 'test/**/*.js'

gulp.task('test', () => {
  return gulp.src(TEST_FILES)
             .pipe(babel())
             .pipe(gulp.dest('test_dist'))
             .pipe(mocha({ reporter: 'nyan' }))
})

gulp.task('compile', ['configure'], () => {
  return gulp.src(SOURCES)
             .pipe(babel())
             .pipe(gulp.dest('dist'))
})

gulp.task('configure', () => {
  let env = process.env.AP_ENV ? process.env.AP_ENV : 'test'
  let src = configure.build(env)

  return file('config.js', `module.exports = ${JSON.stringify(src)}\n`, { src: true })
         .pipe(gulp.dest('dist'))
})

gulp.task('default', (cb) => runSequence('compile', 'test', cb))

gulp.task('watch', (done) => {
  gulp.watch(SOURCES, ['default'])
      .on('end', done)
})

