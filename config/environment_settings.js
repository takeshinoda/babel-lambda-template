module.exports = {
  lambda_settings: {
    default: {
      handler: 'index.handler',
      timeout: 60, // seconds
      memorySize: 256 // MB
    },
    development: {
      region: 'hogehoge',
      functionName: 'lambda-test-development',
    },
    test: {
      region: 'hogehoge',
      functionName: 'lambda-test-test',
    },
    staging: {
      region: 'us-west-2',
      functionName: 'lambda-test-staging',
    },
    production: {
      region: 'us-west-2',
      functionName: 'lambda-test-production',
    },
  },
  app: {
    default: {
      lambdaName: 'Hogehoge',
      databaseUrl: (() => process.env['DATABASE_URL'])()
    },
    development: {
      secret: 'dev'
    },
    test: {
      secret: 'tes'
    },
    staging: {
      secret: 'aaa'
    },
    production: {
      secret: 'bbb'
    }
  }
}

