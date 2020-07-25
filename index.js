#!/usr/bin/env node

const figlet = require('figlet')
const clear = require('clear')
const { Spinner } = require('clui')

const {
  normalMsg,
  errorMsg,
  infoMsg,
  successMsg
} = require('./lib/colorStates')
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
  normalMsg(
    figlet.textSync('vaq', {
      font: 'Doom',
      horizontalLayout: 'full'
    })
  )

const runCommand = async (command) => {
  if (command === 'query') {
    const { query } = await askForQuery()
    const results = await queryPlugins({ query })
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

    const status = new Spinner('Getting set up...')
    status.start()

    store.set('vimpath', vimpath)
    store.set('vimtype', vimtype)

    status.stop()

    successMsg("Saved. Let's continue...")

    runMenu()

    // display options
  } else {
    runMenu()
  }
}

run()
