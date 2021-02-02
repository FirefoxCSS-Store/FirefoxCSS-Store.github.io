class Card {

  constructor (data, id) {

    this._id           = id
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
