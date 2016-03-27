import 'babel-polyfill'
import gulp     from 'gulp'
import gutil    from 'gulp-util'
import babel    from 'gulp-babel'
import mocha    from 'gulp-mocha'
import istanbul from 'gulp-istanbul'
import file     from 'gulp-file'
import zip      from 'gulp-zip'
import install  from 'gulp-install'

import runSequence from 'run-sequence'

import awsLambda   from 'node-aws-lambda'
import aws         from 'aws-sdk'

import configure from './build_src/configure'
import settings  from './config/environment_settings'

const SOURCES    = 'src/**/*.js'
const TEST_FILES = ['test/**/*_test.js', '!test/fixtures/*.js']

gulp.task('test', ['configure'], () => {
  return gulp.src(TEST_FILES)
             .pipe(mocha({ reporter: 'nyan' }))
})

gulp.task('pre-test-coverage', ['configure'], () => {
  return gulp.src(SOURCES)
             .pipe(istanbul( { instrumenter: require('isparta').Instrumenter }))
             .pipe(istanbul.hookRequire());
})

gulp.task('test:coverage', ['pre-test-coverage'], () => {
  return gulp.src(TEST_FILES)
             .pipe(mocha({ reporter: 'nyan' }))
             .pipe(istanbul.writeReports())
             .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
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
         .pipe(gulp.dest('src'))
})

gulp.task('install', () => {
  return gulp.src('package.json')
             .pipe(gulp.dest('dist'))
             .pipe(install({ production: true }))
})

gulp.task('zip', () => {
  return gulp.src(['dist/**/*'])
             .pipe(zip('dist.zip'))
             .pipe(gulp.dest('./'))
})

gulp.task('deploy', (done) => {
  awsLambda.deploy('./dist.zip', require('./dist/config').lambda_params, done);
})

for (let env in settings.lambda_params) {
  gulp.task(`deploy-${env}`, (done) => {
    process.env.AP_ENV = env
    runSequence(['compile', 'install'], 'test', 'zip', 'deploy', done)
  })

  gulp.task(`invoke-${env}`, (done) => {
    let setting = Object.assign(settings.lambda_params.default, settings.lambda_params[env])
    let lambda = new aws.Lambda({ region: setting.region })
    let params = {
      FunctionName: setting.functionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(require('./test/fixtures/invoke_payload'))
    }

    lambda.invoke(params, (err, data) => {
      if (err) {
        gutil.log(err, err.stack)
      }
      else {
        if (data.FunctionError) {
          gutil.log(`Failed invocation ${params.FunctionName}`)
          gutil.log(data.FunctionError)
        }
        else {
          gutil.log(`Success invocation ${params.FunctionName}`)
        }
        gutil.log('Result:')
        gutil.log(data.Payload)
      }
      done()
    })
  })
}

gulp.task('invoke', ['invoke-development'])

gulp.task('watch', (done) => {
  gulp.watch(SOURCES, ['default'])
      .on('end', done)
})

gulp.task('default', (done) => runSequence('compile', 'test', done))

