const themes = require('../themes.json')

const allBugs = []

themes.forEach((entry, index) => {

  const currentBugs = []

  const keys       =  Object.keys(entry)
  const objectKeys =  keys[0] !== 'title'       ||
                      keys[1] !== 'link'        ||
                      keys[2] !== 'description' ||
                      keys[3] !== 'image'       ||
                      keys[4] !== 'tags'        ||
                      keys[5] !== 'repository'
  const objectTypes = typeof entry[keys[0]] !== 'string' ||
                      typeof entry[keys[1]] !== 'string' ||
                      typeof entry[keys[2]] !== 'string' ||
                      typeof entry[keys[3]] !== 'string' ||
                      typeof entry[keys[4]] !== 'object' ||
                      typeof entry[keys[5]] !== 'string'

  if (typeof entry !== 'object') currentBugs.push('This theme is not an object.')
  if (keys.length < 6) currentBugs.push(`Is expected to have at least 6 keys, but has ${keys.length}.`)
  if (objectKeys) currentBugs.push('Verify name of object keys, respectively, it must be: title, link, description, image, tags')
  if (objectTypes) currentBugs.push('All object entries must be strings with the exception of tags, which is an array!')

  if (currentBugs.length !== 0) allBugs.push(`Theme "${entry.title}" (index: ${index} has the following ${currentBugs.length} bug(s):\n${currentBugs.join('\n')}`)

})

if (allBugs.length !== 0) {
  throw allBugs.join('\n\n')
}
