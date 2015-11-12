module.exports = {
  lambda_params: {
    // https://github.com/ThoughtWorksStudios/node-aws-lambda
    default: {
      handler: 'index.handler',
      description: 'sample',
      timeout: 60, // seconds
      memorySize: 128, // MB
      role: 'arn:aws:iam::.....' // arn
    },
    development: {
      region: 'ap-northeast-1',
      functionName: 'lambda-test-development',
    },
    test: {
      region: 'ap-northeast-1',
      functionName: 'lambda-test-test',
    },
    staging: {
      region: 'ap-northeast-1',
      functionName: 'lambda-test-staging',
    },
    production: {
      region: 'ap-northeast-1',
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

