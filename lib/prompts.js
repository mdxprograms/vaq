const inquirer = require('inquirer')

const askForVimInfo = () => {
  const questions = [
    {
      name: 'vimpath',
      type: 'input',
      message: 'What is the path to your vim config file using vim-plug?',
      validate: (val) => {
        if (val.length) {
          return true
        } else {
          return 'Please enter a path to your vim config file'
        }
      }
    },
    {
      name: 'vimtype',
      type: 'list',
      message: 'Are you using neovim (nvim) or vim?',
      choices: ['nvim', 'vim'],
      default: 'vim'
    }
  ]

  return inquirer.prompt(questions)
}

const askForQuery = () =>
  inquirer.prompt([
    {
      name: 'query',
      type: 'input',
      message: 'query',
      validate: (val) => {
        if (val.length === 0) {
          return 'Must supply a name'
        } else {
          return true
        }
      }
    }
  ])

const askPluginSelection = (plugins) =>
  inquirer.prompt([
    {
      name: 'selection',
      type: 'list',
      choices: plugins.map((p) => ({
        name: `${p.name} - ${p.short_desc}`,
        value: p,
        short: `${p.name} - ${p.short_desc}`
      }))
    }
  ])

const menuSelection = () =>
  inquirer.prompt([
    {
      name: 'command',
      type: 'list',
      choices: ['query', 'install', 'uninstall', 'list'],
      default: 'query'
    }
  ])

module.exports = {
  askForVimInfo,
  askForQuery,
  askPluginSelection,
  menuSelection
}
