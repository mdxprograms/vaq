import axios from 'axios'

// vim awesome api
const API = 'https://vimawesome.com/api/plugins'

const fetchPlugins = (pageNum = 1) =>
  axios
    .get(`${API}?page=${pageNum}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))

fetchPlugins().then((plugs) => {
  plugs.forEach((p) => console.log(p))
})
