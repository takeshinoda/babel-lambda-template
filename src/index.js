
exports.handler = (event, context) => {
  console.log(event)
  context.succeed('success')
}

