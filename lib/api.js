/* eslint-disable camelcase */
const axios = require('axios')
const { Spinner } = require('clui')
const { errorMsg } = require('./colorStates')

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
    .catch((err) => {
      status.stop()
      errorMsg(err)
    })
}

// example: plugin -> vim-surround
const fetchPluginDetails = (plugin) => {
  const status = new Spinner(`fetching details for ${plugin}`)
  status.start()

  return axios
    .get(`${API}/${plugin}`)
    .then((res) => {
      status.stop()
      const {
        author,
        github_homepage,
        github_stars,
        github_short_desc,
        github_url
      } = res.data
      return {
        author,
        homepage: github_homepage,
        'github stars': github_stars,
        description: github_short_desc,
        'github url': github_url
      }
    })
    .catch((err) => {
      status.stop()
      errorMsg(err)
    })
}

const fetchAllPlugins = async () => await fetchPluginData()

const queryPlugins = async ({ query }) => await fetchPluginData(1, query)

module.exports = {
  fetchAllPlugins,
  fetchPluginDetails,
  queryPlugins
}
