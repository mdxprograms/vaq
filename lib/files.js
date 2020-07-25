const os = require('os')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const store = require('./store')

// read config file as stream
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

const gitUrlToPlugUrl = (githubUrl) =>
  githubUrl.replace('https://github.com/', '')

const plugExists = (plugins, githubUrl) =>
  plugins.find((pLine) => pLine.includes(gitUrlToPlugUrl(githubUrl)))

const readConfigPlugins = (lines) => lines.filter((l) => l.includes('Plug '))

const getConfigPlugins = async () => readConfigPlugins(await readConfig$())

const savePlugin = async (githubUrl) => {
  if (plugExists(await getConfigPlugins(), githubUrl)) {
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
