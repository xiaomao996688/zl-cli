const ora = require('ora')
async function sleep (n) {
  return new Promise((resolve, reject) => setTimeout(resolve, n))
}
async function wrapLoading (fn ,message, ...args) {
  const spinner = ora(message)
  spinner.start() //开启加载
  try {
    let repos = await fn(...args)
    spinner.succeed() 
    return repos
  } catch(e) {
    spinner.fail('request fialed , refetch...')
    await sleep(1000)
    return wrapLoading(fn(...args), message)
  }
}
module.exports = {
  wrapLoading
}
