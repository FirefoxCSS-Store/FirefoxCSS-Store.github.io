fetch('themes.json')
.then(data => data.json())
.then(parsedData => {

  parsedData.forEach(entry => {

    const output = document.createElement('div')
          output.classList.add('card')

    const cardHeader = document.createElement('header')

    const themeTitle = document.createElement('h3')
          themeTitle.classList.add('theme-title')

    const themeTitleLink = document.createElement('a')
          themeTitleLink.href = entry.link
          themeTitleLink.innerText = entry.title

    const themeDownloadIcon = document.createElement('i')
          themeDownloadIcon.classList.add('fas', 'fa-chevron-circle-down')

    const themeMeta = document.createElement('a')
          themeMeta.classList.add('meta')
          themeMeta.href = entry.link

    const themeImage = document.createElement('img')
          themeImage.src = entry.image
          themeImage.alt = entry.title

    const themeDesc = document.createElement('p')
          themeDesc.classList.add('description')
          themeDesc.innerText = entry.description


    themeTitle.appendChild(themeTitleLink)

    cardHeader.appendChild(themeTitle)
    cardHeader.appendChild(themeDownloadIcon)

    themeMeta.appendChild(themeImage)
    themeMeta.appendChild(themeDesc)

    output.appendChild(cardHeader)
    output.appendChild(themeMeta)

    const container = document.getElementById('main_content')
          container.appendChild(output)

  })
})



const themeTrigger     = document.getElementById('js-themeSwitcher')
const themeTriggerIcon = themeTrigger.querySelector('i')

themeTrigger.addEventListener('click', event => {

  document.body.classList.toggle('nightmode')

  themeTriggerIcon.classList.toggle('fa-sun')
  themeTriggerIcon.classList.toggle('fa-moon')

})
