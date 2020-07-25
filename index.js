#!/usr/bin/env node

const figlet = require('figlet')
const clear = require('clear')

const { infoMsg, successMsg } = require('./lib/colorStates')
const { savePlugin } = require('./lib/files')
const { fetchAllPlugins, queryPlugins } = require('./lib/api')
const {
  askForVimInfo,
  askForQuery,
  askPluginSelection,
  menuSelection
} = require('./lib/prompts')
const store = require('./lib/store')

const sendCliHeading = () =>
  infoMsg(
    figlet.textSync('Vim Awesome Query', {
      font: 'Shadow',
      horizontalLayout: 'fitted'
    })
  )

const runCommand = async (command) => {
  if (command === 'query') {
    const { query } = await askForQuery()
    const results = await queryPlugins({ query })
    const { selection } = await askPluginSelection(results.plugins)

    savePlugin(selection.github_url)
  }

  if (command === 'list') {
    const results = await fetchAllPlugins()
    const { selection } = await askPluginSelection(results.plugins)

    savePlugin(selection.github_url)
  }
}

const runMenu = async () => {
  const { command } = await menuSelection()
  runCommand(command)
}

const run = async () => {
  clear()
  sendCliHeading()

  if (!store.get('vimpath')) {
    const { vimpath, vimtype } = await askForVimInfo()

    store.set('vimpath', vimpath)
    store.set('vimtype', vimtype)

    successMsg("Saved. Let's continue...")
    runMenu()
  } else {
    runMenu()
  }
}

run()
