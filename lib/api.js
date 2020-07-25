const axios = require('axios')

// vim awesome api
const API = 'https://vimawesome.com/api/plugins'

const fetchPluginData = (pageNum = 1, query = '') =>
  axios
    .get(`${API}?page=${pageNum}&query=${query}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))

const fetchAllPlugins = async () => await fetchPluginData()

const queryPlugins = async ({ query }) => await fetchPluginData(1, query)

module.exports = {
  fetchAllPlugins,
  queryPlugins
}
