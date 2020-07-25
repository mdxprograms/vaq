const axios = require('axios')
const { Spinner } = require('clui')

// vim awesome api
const API = 'https://vimawesome.com/api/plugins'

const fetchPluginData = (pageNum = 1, query = '') => {
  const status = new Spinner('fetching...')
  status.start()

  return axios
    .get(`${API}?page=${pageNum}&query=${query}`)
    .then((res) => {
      status.stop()
      return res.data
    })
    .catch((err) => console.log(err))
}

const fetchAllPlugins = async () => await fetchPluginData()

const queryPlugins = async ({ query }) => await fetchPluginData(1, query)

module.exports = {
  fetchAllPlugins,
  queryPlugins
}
