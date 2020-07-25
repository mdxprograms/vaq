const chalk = require('chalk')

module.exports = {
  normalMsg: (msg) => console.log(chalk.yellow(msg)),
  errorMsg: (msg) => console.log(chalk.red(msg)),
  infoMsg: (msg) => console.log(chalk.blue(msg)),
  successMsg: (msg) => console.log(chalk.green(msg))
}
