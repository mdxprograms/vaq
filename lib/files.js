const os = require('os')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const store = require('./store')

const readConfig$ = async () => {
  const fileStream = fs.createReadStream(
    path.resolve(os.homedir(), store.get('vimpath')),
    'utf8'
  )

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

const gitUrlToPlug = (githubUrl) => githubUrl.replace('https://github.com/', '')

const plugExists = (plugins, githubUrl) =>
  plugins.find((pLine) => pLine.includes(gitUrlToPlug(githubUrl)))

const readConfigPlugins = (lines) => lines.filter((l) => l.includes('Plug '))

const savePlugin = async (githubUrl) => {
  const currentPlugins = readConfigPlugins(await readConfig$())

  if (plugExists(currentPlugins, githubUrl)) {
    console.log('Plugin already exists in ', store.get('vimpath'))
  } else {
    console.log(`Installing ${githubUrl}`)
    // TODO: Add to file
    // TODO: vim plug install
    // reload?
  }
}

module.exports = {
  getCurrentDir: () => path.basename(process.cwd()),
  dirExists: (fpath) => fs.existsSync(fpath),
  savePlugin
}
