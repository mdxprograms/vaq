import chalk from 'chalk'

export const normalMsg = (msg) => console.log(chalk.yellow(msg))

export const errorMsg = (msg) => console.log(chalk.red(msg))

export const infoMsg = (msg) => console.log(chalk.blue(msg))

export const successMsg = (msg) => console.log(chalk.green(msg))
