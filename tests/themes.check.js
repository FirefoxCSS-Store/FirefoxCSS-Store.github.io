const themes = require('../themes.json')

let allBugs = []

themes.forEach((entry, index) => {

  let currentBugs = []

  const keys       =  Object.keys(entry)
  const objectKeys =  keys[0] !== 'title'       ||
                      keys[1] !== 'link'        ||
                      keys[2] !== 'description' ||
                      keys[3] !== 'image'       ||
                      keys[4] !== 'tags'
  const objectTypes = typeof entry[keys[0]] !== 'string' ||
                      typeof entry[keys[1]] !== 'string' ||
                      typeof entry[keys[2]] !== 'string' ||
                      typeof entry[keys[3]] !== 'string' ||
                      typeof entry[keys[4]] !== 'object'

  if (typeof entry !== 'object') currentBugs.push('This theme is not an object.')
  if (keys.length !== 5) currentBugs.push(`Is expected to have 5 key but has ${keys.length}.`)
  if (objectKeys) currentBugs.push('Verify name of object keys, respectively, it must be: title, link, description, image, tags')
  if (objectTypes) currentBugs.push('All object entries must be strings with the exception of tags, which is an array!')

  if (currentBugs.length !== 0) allBugs.push(`Theme "${entry.title}" (index: ${index} has the following ${currentBugs.length} bug(s):\n${currentBugs.join('\n')}`)

})

if (allBugs.length !== 0) {
  throw allBugs.join('\n\n')
}
