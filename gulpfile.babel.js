import gulp  from 'gulp'
import babel from 'gulp-babel'
import mocha from 'gulp-mocha'
import file  from 'gulp-file'

import configure from './build_src/configure'

const SOURCES    = 'src/**/*.js'
const TEST_FILES = 'test/**/*.js'

gulp.task('test', (done) => {
  gulp.src(TEST_FILES)
      .pipe(babel())
      .pipe(gulp.dest('test_dist'))
      .pipe(mocha({ reporter: 'nyan' }))
      .on('end', () => done())
})

gulp.task('compile', ['configure'], (done) => {
  gulp.src(SOURCES)
      .pipe(babel())
      .pipe(gulp.dest('dist'))
      .on('end', () => done())
})

gulp.task('configure', () => {
  let env = process.env.AP_ENV ? process.env.AP_ENV : 'test'
  let src = configure.build(env)

  file('config.js', `module.exports = ${JSON.stringify(src)}\n`)
    .pipe(gulp.dest('dist'))
    .on('end', () => done())
})
 
gulp.task('default', ['compile', 'test'])

gulp.task('watch', (cb) => {
  gulp.watch(SOURCES, ['compile', 'test'])
      .on('end', cb)
})

