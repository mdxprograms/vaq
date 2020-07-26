const getPlugNameFromConfig = (plugLine) => {
  const firstParse = plugLine
    .replace('Plug ', '')
    .replace(/'/g, '')
    .split('/')[1]

  let name = firstParse

  if (name.includes('as:')) {
    name = name
      .split(': ')[1]
      .replace(' ', '')
      .replace('}', '')
  }

  name = name.split(', ')[0]
  return name
}

module.exports = {
  getPlugNameFromConfig
}
