
import config from './config'

export function handler(event, context) {
  console.log(event)
  context.succeed('success')
}

