//@ts-check
// ============================================================================
// Current browser selector

// @ts-ignore
const /** @type {HTMLSelectElement} */ choice = document.getElementById('browser')

function getCurrentBrowser() {
  return localStorage.getItem('browser') || 'select'
}

function setCurrentBrowser(browser, choiceTrigger = false) {
  localStorage.setItem('browser', browser)

  if (!choiceTrigger) {
    updateChoicePrompt()
  }
}

function setup() {
  choice.onchange = () => {
    setCurrentBrowser(choice.value, true)
  }
}

function updateChoicePrompt() {
  choice.value = getCurrentBrowser()
  
  // @ts-ignore
  const /** @type {HTMLSelectElement} */ prompt = document.getElementById('popup-browser')
  if (prompt) {
    prompt.value = getCurrentBrowser()
  }

  // @ts-ignore
  const /** @type {HTMLButtonElement} */ prompt_next = document.getElementById('popup-browser-next')
  if (prompt_next) {
    prompt_next.disabled = choice.value === 'select'
  }
}


function sanatise (unsanatisedInput) {

  const tempEl = document.createElement('div')
        tempEl.innerText = unsanatisedInput

  const sanatisedOutput = tempEl.innerHTML
  return sanatisedOutput

}


class Popup {
  constructor(data) {
    this._title        = sanatise(data.title)
    this._description  = sanatise(data.description)
    this._link         = sanatise(data.link)
    this._image        = sanatise(data.image)
    this._data         = data
  }

  render() {
    const stableEnableOptions = [
      'toolkit.legacyUserProfileCustomizations.stylesheets',
      'layers.acceleration.force-enabled',
      'gfx.webrender.all',
      'gfx.webrender.enabled',
      'layout.css.backdrop-filter.enabled',
      'svg.context-properties.content.enabled'
    ]
    
    const nightlyEnableOptions = [
      'extensions.experiments.enabled',
      ...stableEnableOptions
    ]

    removePopup()
    createPopup(`
      <div id="select-browser" style="display: none">
          <h1>Select a browser</h1>

          <div id="browser-grid" class="install-option">
              <div class="browser-card" id="select-stable">
                  <img src="https://www.mozilla.org/media/protocol/img/logos/firefox/browser/logo.eb1324e44442.svg" alt="Firefox stable icon" />
                  <h2>Firefox Stable or Beta</h2>
              </div>
              <div class="browser-card" id="select-dev">
                  <img src="https://www.mozilla.org/media/protocol/img/logos/firefox/browser/developer/logo.41d42822c8fb.svg" alt="Firefox developer edition icon" />
                  <h2>Firefox Developer Edition and Nightly</h2>
              </div>
              <div class="browser-card" id="select-waterfox">
                  <img src="https://www.waterfox.net/img/logo.svg" alt="Waterfox icon" />
                  <h2>Waterfox or Pulse browser</h2>
              </div>
          </div>
      </div>

      <div id="stable-browser" style="display: none;" class="install-option">
          <h1>Installing on Firefox Stable and Beta</h1>

          <ol>
              <li>Download the theme <a href="${this._link}">from the git repository</a>. If it is a Github repo, you can download it by clicking the big green "Code" button and click "Download.zip"</li>
              <li>Open <code>about:config</code></li>
              <li>A dialog will warn you, but ignore t, just doit. Press the "I accept the risk!" button.</li>
              <li>Search for these and enable each of them:
              <ul>
                  ${stableEnableOptions.map(option => `<li><code>${option}</code></li>`).join('')}
              </ul>
              </li>
              <li>Go to your Firefox profile:
              <ul>
                  <li>Linux - <code>$HOME/.mozilla/firefox/XXXXXXX.default-XXXXXX/</code>.</li>
                  <li>Windows 10 - <code>C:\Users\&lt;USERNAME&gt;\AppData\Roaming\Mozilla\Firefox\Profiles\XXXXXXX.default-XXXXXX</code>.</li>
                  <li>macOS - <code>Users/&lt;USERNAME&gt;/Library/Application Support/Firefox/Profiles/XXXXXXX.default-XXXXXXX</code>.</li>
              </ul>
              </li>
              <li>
              Create a folder and name it <code>chrome</code>, then assuming that 
              you already have cloned this repo, just copy the theme to 
              <code>chrome</code> folder.
              </li>
              <li>Restart Firefox</li>
          </ol>
      </div>

      <div id="nightly-browser" style="display: none;" class="install-option">
          <h1>Installing on Firefox Developer Edition and Nightly</h1>

          <ol>
              <li>Open <code>about:config</code></li>
              <li>A dialog will warn you, but ignore t, just doit. Press the "I accept the risk!" button.</li>
              <li>Search for <code>xpinstall.signatures.required</code> and disable it.</li>
              <li>Search for these and enable each of them:
              <ul>
                  ${nightlyEnableOptions.map(option => `<li><code>${option}</code></li>`).join('')}
              </ul>
              </li>
              <li>
              You are now ready to install the theme. Simply clock the button below.
              </li>
          </ol>

          <div class="addon-install-options"></div>
      </div>

      <div id="forked-browser" style="display: none;" class="install-option">
          <h1>Installing on Waterfox and Pulse Browser</h1>

          <p>You are now ready to install the theme. Simply clock the button below.</p>

          <div class="addon-install-options"></div>
      </div>

      <button type="button" class="btn btn-close-lightbox" onClick="removeLightbox()"><i class="fas fa-times-circle"></i> Close</button>
    `, true)

    document.getElementById('select-stable').addEventListener('click', () => this.changeBrowser('firefox-stable', true))
    document.getElementById('select-dev').addEventListener('click', () => this.changeBrowser('firefox-dev', true))
    document.getElementById('select-waterfox').addEventListener('click', () => this.changeBrowser('waterfox', true))

    // Prevent the popup from closing when the user clicks on a UI element
    document.getElementById('select-browser').addEventListener('click', e => e.preventDefault())

    console.log(this._data)

    // If there is no experiment xpi support, we should send them straight to
    // the stable instructions
    const selectedBrowser = this._data.experiment_xpi ? getCurrentBrowser() : 'firefox'

    if (selectedBrowser === 'select') {
      document.getElementById('select-browser').style.display = 'block'
    } else {
      this.changeBrowser(selectedBrowser)
    }

    // If there is no experiment attached, do not perform logic related to it
    if (!this._data.experiment_xpi) return

    const addonClick = document.getElementsByClassName('addon-install-options')
    for (const container of addonClick) {
      for (const style in this._data.experiment_xpi) {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.innerText = style
        button.addEventListener('click', () => location.href = this._data.experiment_xpi[style])
        container.appendChild(button) 
      }
    }
  }

  changeBrowser(selectedBrowser, save = false) {
    if (save) setCurrentBrowser(selectedBrowser)

    const oldElements = ['stable-browser', 'select-browser', 'nightly-browser', 'forked-browser']
    oldElements.forEach(element => document.getElementById(element).style.display = 'none')

    if (selectedBrowser === 'firefox' || selectedBrowser === 'firefox-beta' || selectedBrowser === 'firefox-esr') {
      document.getElementById('stable-browser').style.display = 'block'
    } else if (selectedBrowser === 'firefox-nightly' || selectedBrowser === 'firefox-dev') {
      document.getElementById('nightly-browser').style.display = 'block'
    } else if (selectedBrowser === 'waterfox' || selectedBrowser === 'pulse') {
      document.getElementById('forked-browser').style.display = 'block'
    } else {
      throw new Error(`Unknown browser: ${selectedBrowser}`)
    }
  }
}

// Global variable to store theme data
// TODO: Fix this gankness with something a bit better
var themeData = {}

class Card {

  constructor (data, id) {
    this._id           = id + 1
    this._title        = sanatise(data.title)
    this._description  = sanatise(data.description)
    this._link         = sanatise(data.link)
    this._image        = sanatise(data.image)

    themeData[this._id] = data
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
        <a class="btn btn-download" onclick="new Popup(themeData[${this._id}]).render()"><i class="fas fa-file-download"></i> Download</a>
      </div>
    </div>
    `

    outputContainer.insertAdjacentHTML('beforeend', template)

  }
}

const removePopup = () => document.getElementById('lightbox')?.remove()
const removeLightbox = removePopup

function createPopup(content, isCard = false) {
  const container = document.getElementById('themes_container')

  const template = `<div id="lightbox" class="${isCard ? 'lightbox-card' : ''}" ${!isCard ? 'onclick="this.remove()"' : ''}>${content}</div>`

  container.innerHTML += template
}



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

  createPopup(template)
}



(() => { // IIFE to avoid globals

  // Setup browser select
  // ====================
  setup()

  /*  SEARCH Parameter Handling
   *  ======================
   */

  document.getElementById('searchInput').addEventListener('keydown', e => {

    if (e.key === "Enter") toggleSortType(false)

  })
  
  document.getElementById('searchButton').addEventListener('click', () => toggleSortType(false))

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

      const search = document.getElementById('searchInput').value

      if (search) {

        function matches (text, partial) { return text.toLowerCase().indexOf(partial.toLowerCase()) > -1 }

        const parsedAsArray = Object.entries(parsedData)
        let   searchResults = parsedAsArray.filter(element => matches(`${element[1].title}, ${element[1].tags}`, search))

        searchResults.forEach(result => {

          const card = new Card(result[1], +result[0])
          card.render(outputContainer)

        })

        sortTrigger.title = `"${search}"`

        return 

      }

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
      
    })
  }
  
  // add themes
  const outputContainer = document.getElementById('themes_container')

  if (outputContainer) toggleSortType(false);




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
