import axios from 'axios'

// vim awesome api
const API = 'https://vimawesome.com/api/plugins'

const fetchPluginData = (pageNum = 1, query = '') =>
  axios
    .get(`${API}?page=${pageNum}&query=${query}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))

export const fetchAllPlugins = async () => await fetchPluginData()
