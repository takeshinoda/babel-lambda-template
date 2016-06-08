
import config from './config'

export function handler(event, context, done) {
  console.log(event)
  done(null, 'success')
}

