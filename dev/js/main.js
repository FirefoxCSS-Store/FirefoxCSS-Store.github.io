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
        <a href="${this._link}" tabindex="-1">
          <img src="${this._image}">
          <p class="description">${this._description}</p>
        </a>
      </div>
      <div class="button-wrapper">
        <button class="btn btn-lightbox" type="button" onClick="createLightbox(${this._id})"><i class="fas fa-search-plus"></i> Enlarge</button>
        <a href="${this._link}" class="btn btn-download"><i class="fas fa-file-download"></i> Download</a>
      </div>
    </div>
    `

    outputContainer.insertAdjacentHTML('beforeend', template)

  }
}




const removeLightbox = () => document.body.getElementsById('lightbox').remove()

function createLightbox (id) {

  const card = document.getElementById(`theme-${id}`)
  const themeTitle = card.querySelector('h3')
  const img = card.querySelector('img')

  const template = `
  <div id="lightbox" onclick="this.remove()">
    <h2>${themeTitle.innerText}</h2>
    <img src="${img.src}">
    <button type="button" class="btn btn-close-lightbox" onClick="removeLightbox"><i class="fas fa-times-circle"></i> Close</button>
  </div>
  `

  card.insertAdjacentHTML('afterend', template)

}





(() => { // IIFE to avoid globals

  /*  Load Content
   *  ============
   */

  // add our sorting button
  const sortTrigger = document.getElementById('js-sortSwitcher')
  sortTrigger.addEventListener('click', () => toggleSortType(true))
  
  // When localstorage is not set, use "latest" order type
  if (!localStorage['sort']) localStorage['sort'] = 'latest'

  function repeatToggle (nextType) {

    localStorage['sort'] = nextType
    return toggleSortType(false)

  }

  function toggleSortType (change) {

    if (document.querySelectorAll('.card'))
      document.querySelectorAll('.card').forEach(e => e.remove());

    fetch('themes.json')
    .then(data => data.json())
    .then(parsedData => {   

      switch (localStorage['sort']) {

        // sort from the oldest theme added
        case 'latest':
          if (change) return repeatToggle('random')
          parsedData.reverse()
          break;

        // sort randomly
        case 'random':
          if (change) return repeatToggle('oldest')
          for (let i = parsedData.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            [parsedData[i], parsedData[j]] = [parsedData[j], parsedData[i]]

          }
          break;

        // sort from the most recent theme added
        default:
          if (change) return repeatToggle('latest');

      }

      // TODO: make a better way to preview the current sorting
      sortTrigger.title = localStorage['sort']

      parsedData.forEach((entry, index)  => {

        const card = new Card (entry, index)

        card.render(outputContainer)

      })

    });

  }
  
  // add themes
  const outputContainer = document.getElementById('themes_container')
  if (outputContainer) toggleSortType(false)


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

  themeTrigger.addEventListener('click', () => toggleTheme())

})()
