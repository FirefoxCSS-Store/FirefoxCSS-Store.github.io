class Card {

  constructor (data, id) {

    this._id           = id + 1
    this._themeIsValid = this.validateTheme(data)

    if (this._themeIsValid) {
      this._title        = this.sanatise(data.title)
      this._description  = this.sanatise(data.description)
      this._link         = this.sanatise(data.link)
      this._image        = this.sanatise(data.image)
    }
  }


  validateTheme (data) {

    let bugs = []

    try {

      const keys       =  Object.keys(data)
      const objectKeys =  keys[0] !== 'title'       ||
                          keys[1] !== 'link'        ||
                          keys[2] !== 'description' ||
                          keys[3] !== 'image'
      const objectTypes = typeof data[keys[0]] !== 'string' ||
                          typeof data[keys[1]] !== 'string' ||
                          typeof data[keys[2]] !== 'string' ||
                          typeof data[keys[3]] !== 'string'

      if (typeof data !== 'object') bugs.push('This theme is not an object.')
      if (keys.length !== 4) bugs.push(`Is expected to have 4 key but has ${keys.length}.`)
      if (objectKeys) bugs.push('Verify name of object keys, respectively, it must be: title, link, description, image.')
      if (objectTypes) bugs.push('All object entries must be strings!')

      if (bugs.length !== 0) throw bugs.length

    }

    catch (errorCount) {

      console.warn(`Theme ${this._id} has the following ${errorCount} bug(s):\n${bugs.join('\n')}`)
      return false

    }

    return true

  }


  sanatise (unsanatisedInput) {

    const tempEl = document.createElement('div')
          tempEl.innerText = unsanatisedInput

    const sanatisedOutput = tempEl.innerHTML
    return sanatisedOutput

  }


  render (outputContainer) {

    // don't render anything when the theme format is invalid
    if (!this._themeIsValid) return

    const template = `
    <div id="theme-${this._id}" class="card">
      <header>
        <h3 class="theme-title"><a hef="${this._link}">${this._title}</a></h3>
        <i class="fas fa-chevron-circle-down"></i>
      </header>
      <a class="meta" href="${this._link}">
        <img src="${this._image}">
        <p class="description">${this._description}</p>
      </a>
    </div>
    `

    outputContainer.insertAdjacentHTML('beforeend', template);

  }
}



(() => { // IIFE to avoid globals

  fetch('themes.json')
  .then(data => data.json())
  .then(parsedData => {

    parsedData.forEach((entry, index)  => {

      const outputContainer = document.getElementById('main_content')
      const card = new Card (entry, index)

      card.render(outputContainer)

    })
  })
})()
