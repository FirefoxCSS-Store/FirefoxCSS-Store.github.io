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

// Themes

const prefDark         = window.matchMedia("(prefers-color-scheme: dark)").matches,
      prefTheme        = localStorage['theme'],
      themeTrigger     = document.getElementById('js-themeSwitcher'),
      themeTriggerIcon = themeTrigger.querySelector('i');

const toggleTheme = () => { 
  document.documentElement.classList.toggle('nightmode')
  document.documentElement.classList.toggle('daymode')

  themeTriggerIcon.classList.toggle('fa-sun')
  themeTriggerIcon.classList.toggle('fa-moon')
}


if (prefDark) {
  document.documentElement.classList.add('nightmode')
  themeTriggerIcon.classList.remove('fa-moon')
  themeTriggerIcon.classList.add('fa-sun')
}
if (!prefDark) { document.body.classList.add('daymode') }


if (prefTheme === 'day') {
  toggleTheme();
}  
else
  localStorage['theme'] = 'night';


themeTrigger.addEventListener('click', event => {
  if (localStorage['theme'] === 'night')
    localStorage['theme'] = 'day'
  else
    localStorage['theme'] = 'night';

  toggleTheme()
})
