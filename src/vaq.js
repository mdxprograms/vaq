import figlet from 'figlet'
import clear from 'clear'
import figStandard from 'figlet/importable-fonts/Standard.js'
import { Spinner } from 'clui'

import { normalMsg, errorMsg, infoMsg, successMsg } from './colorStates'
import { getCurrentDir, dirExists } from './files'
import { fetchAllPlugins } from './api'
import { askForVimInfo } from './prompts'
import store from './store'

const sendCliHeading = () => {
  figlet.parseFont('Standard', figStandard)

  normalMsg(
    figlet.textSync('Vaq (vim awesome query)', {
      font: 'Standard'
    })
  )
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
  } else {
    console.log(store.get('vimpath'))
  }
}

run()
