import 'babel-polyfill'
import settings from '../config/environment_settings'

exports.build = (environment_name) => {
  let results = {}

  for (let group in settings) {
    let group_settings = settings[group]
    results[group]  = group_settings.default ? group_settings.default : {}
    let env_settings = group_settings[environment_name] ? group_settings[environment_name] : {}
    Object.assign(results[group], env_settings)
  }
  return results
}

