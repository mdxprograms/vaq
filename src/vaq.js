import figlet from 'figlet'
import clear from 'clear'
import figStandard from 'figlet/importable-fonts/Standard.js'

import { normalMsg, errorMsg, infoMsg } from './colorStates'
import { getCurrentDir, dirExists } from './files'
import { fetchAllPlugins } from './api'

const sendCliHeading = () => {
  figlet.parseFont('Standard', figStandard)

  normalMsg(
    figlet.textSync('Vaq (vim awesome query)', {
      font: 'Standard'
    })
  )
}

// fetchAllPlugins()

clear()

sendCliHeading()
