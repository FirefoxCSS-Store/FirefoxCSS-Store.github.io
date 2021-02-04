const themes = require('../themes.json')

let allBugs = []

themes.forEach((entry, index) => {

  let currentBugs = []

  const keys       =  Object.keys(entry)
  const objectKeys =  keys[0] !== 'title'       ||
                      keys[1] !== 'link'        ||
                      keys[2] !== 'description' ||
                      keys[3] !== 'image'
  const objectTypes = typeof entry[keys[0]] !== 'string' ||
                      typeof entry[keys[1]] !== 'string' ||
                      typeof entry[keys[2]] !== 'string' ||
                      typeof entry[keys[3]] !== 'string'

  if (typeof entry !== 'object') currentBugs.push('This theme is not an object.')
  if (keys.length !== 4) currentBugs.push(`Is expected to have 4 key but has ${keys.length}.`)
  if (objectKeys) currentBugs.push('Verify name of object keys, respectively, it must be: title, link, description, image.')
  if (objectTypes) currentBugs.push('All object entries must be strings!')

  if (currentBugs.length !== 0) allBugs.push(`Theme ${index} has the following ${currentBugs.length} bug(s):\n${currentBugs.join('\n')}`)

})

if (allBugs.length !== 0) {
  throw allBugs.join('\n\n')
}
