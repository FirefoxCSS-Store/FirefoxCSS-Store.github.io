class Card {

  constructor (data, id) {

    this._id           = id + 1
    this._title        = this.sanatise(data.title)
    this._description  = this.sanatise(data.description)
    this._link         = this.sanatise(data.link)
    this._image        = this.sanatise(data.image)

  }


  sanatise (unsanatisedInput) {

    const tempEl = document.createElement('div')
          tempEl.innerText = unsanatisedInput

    const sanatisedOutput = tempEl.innerHTML
    return sanatisedOutput

  }


  render (outputContainer) {

    const template = `
    <div id="theme-${this._id}" class="card">
      <header>
        <h3 class="theme-title">${this._title}</h3>
        <a href="${this._link}">
          <i class="fas fa-chevron-circle-down"></i>
        </a>
      </header>
      <div class="meta">
        <a href="${this._link}">
          <img src="${this._image}">
          <p class="description">${this._description}</p>
        </a>
      </div>
      <div class="button-wrapper">
        <button class="btn btn-lightbox" type="button" onClick="lightbox(${this._id})"><i class="fas fa-search-plus"></i> Enlarge</button>
        <a href="${this._link}"><button class="btn btn-download" type="button"><i class="fas fa-file-download"></i> Download</button></a>
      </div>
    </div>
    `

    outputContainer.insertAdjacentHTML('beforeend', template)

  }
}





function lightbox (id) {

  const card = document.getElementById(`theme-${id}`)
  const themeTitle = card.querySelector('h3')
  const img = card.querySelector('img')

  const template = `
  <div id="lightbox" onclick="this.remove()">
    <h2>${themeTitle.innerText}</h2>
    <img src="${img.src}">
  </div>
  `

  document.body.insertAdjacentHTML('beforeend', template)

}





(() => { // IIFE to avoid globals

  /*  Load Content
   *  ============
   */

  const outputContainer = document.getElementById('themes_container')

  if (outputContainer) {
    fetch('themes.json')
    .then(data => data.json())
    .then(parsedData => {

      // sort from the most recent theme added
      // temporary since we're going to add a button to sort
      // in different ways
      parsedData.reverse()

      parsedData.forEach((entry, index)  => {

        const card = new Card (entry, index)

        card.render(outputContainer)

      })
    })
  }



  /*  Theme Handling
   *  ==============
   */

  const systemPref       = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'night' : 'day',
        themeTrigger     = document.getElementById('js-themeSwitcher'),
        themeTriggerIcon = themeTrigger.querySelector('i')

  // when local storage is not populated set the system preferrence as value
  if (!localStorage['theme']) localStorage['theme'] = systemPref === 'day' ? 'day' : 'night'

  // set nightmode when according to local storage
  if (localStorage['theme'] === 'night') {

    themeTriggerIcon.classList.toggle('fa-sun')
    themeTriggerIcon.classList.toggle('fa-moon')

    document.documentElement.classList.add('nightmode')

  } else { document.documentElement.classList.add('daymode') }


  function toggleTheme () {

    document.documentElement.classList.toggle('nightmode')
    document.documentElement.classList.toggle('daymode')

    themeTriggerIcon.classList.toggle('fa-sun')
    themeTriggerIcon.classList.toggle('fa-moon')

    // update local storage
    if (localStorage['theme'] === 'night') localStorage['theme'] = 'day'
    else localStorage['theme'] = 'night'

  }

  themeTrigger.addEventListener('click', event => toggleTheme())

})()
