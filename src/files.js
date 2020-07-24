import fs from 'fs'
import path from 'path'

export const getCurrentDir = () => path.basename(process.cwd())

export const dirExists = (fpath) => fs.existsSync(fpath)
