const fs = require('fs')
const path = require('path')

module.exports = {
  getCurrentDir: () => path.basename(process.cwd()),
  dirExists: (fpath) => fs.existsSync(fpath)
}
