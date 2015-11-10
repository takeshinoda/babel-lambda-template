
import config from './config'

// Babel6 export syntax bug?
exports.handler = (event, context) => {
  console.log(config)
  context.succeed('success')
}

