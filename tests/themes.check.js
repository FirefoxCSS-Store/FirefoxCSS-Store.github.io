//@ts-check

const download = require('download')
const fs = require('fs') 
const JSZip = require('jszip')
const { join, basename } = require('path')
const { validator } = require('xpi-creator')

const themes = require('../themes.json')

const tempDir = join(__dirname, 'temp')

let allBugs = []

;(async () => {
  for (const [entry, index] of themes.map((e, i) => [e, i])) {
    fs.mkdirSync(tempDir, { recursive: true })

    let currentBugs = []

    const keys       =  Object.keys(entry)
    const objectKeys =  keys[0] !== 'title'       ||
                        keys[1] !== 'link'        ||
                        keys[2] !== 'description' ||
                        keys[3] !== 'image'       ||
                        keys[4] !== 'tags'        ||
                        !(keys[5] === 'experiment_xpi' || keys[5] === undefined)

    const objectTypes = typeof entry[keys[0]] !== 'string' ||
                        typeof entry[keys[1]] !== 'string' ||
                        typeof entry[keys[2]] !== 'string' ||
                        typeof entry[keys[3]] !== 'string' ||
                        typeof entry[keys[4]] !== 'object' ||
                        !(typeof entry[keys[5]] === 'object' || typeof entry[keys[5]] === 'undefined')

    if (typeof entry !== 'object') currentBugs.push('This theme is not an object.')
    if (keys.length !== 5 && keys.length !== 6) currentBugs.push(`Is expected to have 5 or 6 key but has ${keys.length}.`)
    if (objectKeys) currentBugs.push('Verify name of object keys, respectively, it must be: title, link, description, image, tags')
    if (objectTypes) currentBugs.push('All object entries must be strings with the exception of tags, which is an array!')

    if (entry['experiment_xpi']) {
      for (const themeName in entry[keys[5]]) {
        const /** @type {string} */ value = entry[keys[5]][themeName]
        
        if (typeof value !== 'string') {
          currentBugs.push(`The value of ${themeName} is not a string.`)
          currentBugs.push('There may be more bugs')
          return
        }

        if (!value.endsWith('.xpi')) {
          currentBugs.push(`The value of ${themeName} is not a valid xpi file.`)
          currentBugs.push('There may be more bugs')
          return
        }

        // Download and unpack the xpi file. That is required to check if the theme
        // is valid so it can be included in the webpage and provide a good user
        // experience.
        const store = join(tempDir, basename(value))
        await download(value, tempDir)
        
        const zip = new JSZip() 
        await zip.loadAsync(fs.readFileSync(store))
        const manifest = await zip.file('manifest.json').async('string')
        const validate = validator.validate(manifest)

        for (const key of validate) {
          // @ts-ignore
          currentBugs.push(`${validator.errorCodes[key]}... ${validator.errorMessage[key]}`)
        }
      }
    }

    // @ts-ignore
    if (currentBugs.length !== 0) allBugs.push(`Theme "${entry.title}" (index: ${index} has the following ${currentBugs.length} bug(s):\n${currentBugs.join('\n')}`)

    fs.rmdirSync(tempDir, { recursive: true })
  }

  if (allBugs.length !== 0) {
    throw allBugs.join('\n\n')
  }  
})().catch(e => {
  console.error(e)
  process.exit(1)
})