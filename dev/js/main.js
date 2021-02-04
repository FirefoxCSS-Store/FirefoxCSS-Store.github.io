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
        <h3 class="theme-title"><a hef="${this._link}">${this._title}</a></h3>
        <i class="fas fa-chevron-circle-down"></i>
      </header>
      <a class="meta" href="${this._link}">
        <img src="${this._image}">
        <p class="description">${this._description}</p>
      </a>
    </div>
    `

    outputContainer.insertAdjacentHTML('beforeend', template)

  }
}



(() => { // IIFE to avoid globals

  /*  Load Content
   *  ============
   */

  fetch('themes.json')
  .then(data => data.json())
  .then(parsedData => {

    parsedData.forEach((entry, index)  => {

      const outputContainer = document.getElementById('themes_container')
      const card = new Card (entry, index)

      card.render(outputContainer)

    })
  })


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
