/* eslint camelcase: [0, { properties: never }] */

const os = require('os')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const readline = require('readline')
const replace = require('replace-in-file')
const { Spinner } = require('clui')

const store = require('./store')
const { infoMsg, successMsg, errorMsg } = require('./colorStates')

const vimpath = path.resolve(os.homedir(), store.get('vimpath'))

// read config file as stream
const readConfig$ = async () => {
  const fileStream = fs.createReadStream(vimpath, 'utf8')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  const lines = []

  for await (const line of rl) {
    lines.push(line)
  }

  return lines
}

const gitUrlToPlugUrl = (github_url) =>
  github_url.replace('https://github.com/', '')

const plugExists = (plugins, github_url) =>
  plugins.find((pLine) => pLine.includes(gitUrlToPlugUrl(github_url)))

const readConfigPlugins = (lines) => lines.filter((l) => l.includes('Plug '))

const getConfigPlugins = async () => readConfigPlugins(await readConfig$())

const installPlugins = () =>
  exec(`${store.get('vimtype')} +"PlugInstall --sync" +qall &> /dev/null`)

const savePlugin = async ({ name, github_url }) => {
  if (plugExists(await getConfigPlugins(), github_url)) {
    return infoMsg(`Good news! ${name} is already installed.`)
  } else {
    const pluginLine = `Plug '${gitUrlToPlugUrl(github_url)}'`

    const status = new Spinner(`Installing ${name}`)

    status.start()

    const pluginLines = await getConfigPlugins()
    const withNewPlugin = Array.from(pluginLines)
    withNewPlugin.push(pluginLine)

    try {
      await replace({
        files: vimpath,
        from: pluginLines.join('\n'),
        to: withNewPlugin.join('\n')
      })
      installPlugins()

      status.stop()
      return successMsg(`${name} installed`)
    } catch (e) {
      status.stop()
      return errorMsg(e)
    }
  }
}

// TODO: Delete plugin

// TODO: Update plugins

module.exports = {
  getCurrentDir: () => path.basename(process.cwd()),
  dirExists: (fpath) => fs.existsSync(fpath),
  savePlugin
}
