function sanatise (unsanatisedInput) {

  const tempEl = document.createElement('div')
        tempEl.innerText = unsanatisedInput

  const sanatisedOutput = tempEl.innerHTML
  return sanatisedOutput

}



class Card {

  constructor (data, id) {

    this._id           = id + 1
    this._title        = sanatise(data.title)
    this._description  = sanatise(data.description)
    this._link         = sanatise(data.link)
    this._image        = sanatise(data.image)

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

  /*  SEARCH Parameter Handling
   *  ======================
   */

	const search = /** @type {HTMLInputElement} */ (document.getElementById('searchInput'))

	search.addEventListener('keydown', e => {

	if (e.key === "Enter")
		sort(search.value)

  })
  
  document.getElementById('searchButton').addEventListener('click', () => (false))

  /*  Load Content
   *  ============
   */

	/*
	 * If sorting is not set yet in `localStorage`,
	 * then use as default `latest` kind.
	 */
	if (!localStorage.sort)
		localStorage.sort = 'latest'

	/*
	 * Make the sort icon a button.
	 */
	const sort_trigger = /** @type {HTMLElement} */ (document.getElementById('js-sortSwitcher'))
	sort_trigger.addEventListener('click', () => toggle_sorting())
	sort()

	/**
	 * Toggle the sorting type of the themes.
	 **/
	function toggle_sorting () {

		switch (localStorage.sort)
		{
			case 'latest':
				localStorage.sort = 'updated'
				break
			case 'updated':
				localStorage.sort = 'stars'
				break
			case 'stars':
				localStorage.sort = 'random'
				break;
			case 'random':
				localStorage.sort = 'oldest'
				break
			default:
				localStorage.sort = 'latest'
		}

		return sort()

	}

	/**
	 * Toggle the sorting type of the themes.
	 *
	 * @param {string=} filter Term to filter the themes.
	 **/
	function sort (filter) {

		sort_trigger.title = `"${localStorage.sort}"`

		// Remove all themes cards from the page.
		const cards_container = document.getElementById('themes_container')
		if (cards_container)
			cards_container.innerHTML = ''

		fetch('themes.json')
			.then(data => data.json())
			.then(data => {

				data = Object.entries(data)

				if (filter) {

					/**
					 * Match any substring (partial) from a string (text).
					 * @param {string} text
					 * @param {string} partial
					 */
					function matches (text, partial) {
						return text.toLowerCase().indexOf(partial.toLowerCase()) > -1
					}

					data = data.filter(element => matches(`${element[1].title}, ${element[1].tags}`, search.value))

				}

				switch (localStorage.sort) {

					/*
					 * Sort from the most recent theme added.
					 */
					case 'latest':
						data.reverse()
					break

					/*
					 * Ascending sorting of stars from repositories.
					 */
					case 'updated':
						// item1.attr.localeCompare(item2.attr);
						data.sort((a, b) => b[1].pushed_at.localeCompare(a[1].pushed_at))
					break

					/*
					 * Ascending sorting of stars from repositories.
					 */
					case 'stars':
						data.sort((a, b) => b[1].stargazers_count - a[1].stargazers_count)
					break

					/*
					 * Randomly sorting of themes.
					 */
					case 'random':
						for (let i = data.length - 1; i > 0; i--) {

							const j = Math.floor(Math.random() * (i + 1));
							[data[i], data[j]] = [data[j], data[i]]

						}
					break

					/*
					 * Sort from the least recent theme added (oldest).
					 * Since it's sorted like this by default from the file, do nothing.
					 */
					default:

				}

				for (const [index, entry] of data)
				{
					const card = new Card(entry, index)
					card.render(outputContainer)
				}

			})
}

  // add themes
  const outputContainer = document.getElementById('themes_container')

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
