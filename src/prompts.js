import inquirer from 'inquirer'
import { infoMsg } from './colorStates'

export const askForVimInfo = () => {
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
