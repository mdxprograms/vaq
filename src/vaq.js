import axios from 'axios'
import figlet from 'figlet'
import figStandard from 'figlet/importable-fonts/Standard.js'

// vim awesome api
const API = 'https://vimawesome.com/api/plugins'

const fetchPluginData = (pageNum = 1, query = '') =>
  axios
    .get(`${API}?page=${pageNum}&query=${query}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))

const fetchAllPlugins = () =>
  fetchPluginData().then((data) => {
    console.log(data.plugins)
  })

const sendCliHeading = () => {
  figlet.parseFont('Standard', figStandard)

  figlet.text(
    'Vaq (vim awesome query)',
    {
      font: 'Standard'
    },
    (err, data) => {
      if (err) {
        console.log('Figlet failed: ', err)
        return
      }

      return console.log(data)
    }
  )
}

// fetchAllPlugins()

sendCliHeading()
