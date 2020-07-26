#!/usr/bin/env node
/* eslint-disable no-case-declarations */

const figlet = require('figlet')
const clear = require('clear')

const { infoMsg, errorMsg, successMsg } = require('./lib/colorStates')
const { savePlugin, removePlugin, updatePlugins } = require('./lib/files')
const { getPlugNameFromConfig } = require('./lib/helpers')
const { fetchPluginDetails, queryPlugins } = require('./lib/api')
const {
  askForVimInfo,
  askForQuery,
  askPluginSelection,
  installedPluginsList,
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
    const { selection, action } = await askPluginSelection(results.plugins)

    switch (action) {
      case 'info':
        const details = await fetchPluginDetails(selection.slug)
        Object.keys(details).forEach((val) =>
          infoMsg(`${val}: ${details[val]}`)
        )
        runMenu()
        break

      case 'install':
        savePlugin(selection)
        runMenu()
        break

      case 'back':
        runCommand('query')
        break

      case 'exit':
        return false

      default:
        errorMsg('Invalid action for plugin')
        return false
    }
  }

  if (command === 'list') {
    const { plugin, action } = await installedPluginsList()

    switch (action) {
      case 'info':
        const details = await fetchPluginDetails(getPlugNameFromConfig(plugin))
        Object.keys(details).forEach((val) =>
          infoMsg(`${val}: ${details[val]}`)
        )
        runMenu()
        break

      case 'uninstall':
        removePlugin(plugin)
        runMenu()
        break

      case 'back':
        runCommand('list')
        break

      case 'exit':
        return false

      default:
        errorMsg('Invalid action for plugin')
        return false
    }
  }

  if (command === 'update') {
    updatePlugins()
    successMsg('Plugins Updated!\n')
    runMenu()
  }

  if (command === 'exit') {
    return false
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

    successMsg("Saved. Let's continue...\n")
    runMenu()
  } else {
    runMenu()
  }
}

run()
