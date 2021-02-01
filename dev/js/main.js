
fetch('themes.json')
.then(data => data.json())
.then(parsedData => {

  parsedData.forEach(entry => {

    const elemns = `
      <div class="card">
        <header>
          <h3 class="theme-title"><a href="${entry.link}">${entry.title}</a></h3>
          <i class="fas fa-chevron-circle-down"></i>
        </header>
        <a class="meta" href="${entry.link}">
          <img src="${entry.image}" alt="${entry.title}">
          <p class="description">${entry.description}</p>
        </a>
      </div>
    `;

    const container = document.getElementById('main_content')
          container.insertAdjacentHTML('beforeend', elemns)
    

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
