const cleanStuff = obj => {
  // clean main checks // weird, but useful for security reason

  let safObj = {},
      // will need help (clean more the string to avoid escaped characters)
      cleanString = new RegExp(/"|'/, 'g'),
      bugs = [];

  try {
    // names
    const keys = Object.keys(obj);
    // object
    if (typeof obj !== 'object') bugs.push('Only objects allowed.');

    if (keys.length === 4) {
      if (keys[0] !== 'title'       || typeof obj[keys[0]] !== 'string' ||
          keys[1] !== 'link'        || typeof obj[keys[1]] !== 'string' ||
          keys[2] !== 'description' || typeof obj[keys[2]] !== 'string' ||
          keys[3] !== 'image'       || typeof obj[keys[3]] !== 'string')
        bugs.push('Verify name of object keys, respectively, it must be: title, link, description, image. All must be strings types without escaped characters.')

      else {
        let props = keys.map(k => obj[k]);
            props = props.map(w => w.replace(cleanString, ''));
        
        // parse already
        [safObj.title, safObj.link, safObj.description, safObj.image ] = 
        [props[0]    ,    props[1],           props[2],      props[3]];
      }
    }  
    else bugs.push('Only 4 object keys allowed.');

    // all bugs
    if (bugs.length !== 0) throw bugs.length;
  }
  catch (e) {
    console.log(`Theme called ${obj.title} has the following bug(s), please resolve (${e}):\n${bugs.join('\n')}`)
    return null;
  }

  // need to verify image manually
  return safObj;
}

// count each card to parse 
fetch('themes.json').then(function (data) {
  return data.json();
}).then(function (parsedData) {
  let i = 0;
  parsedData.forEach(function (entry) {

    const cleanObj = cleanStuff(entry),
          id      = `card-${i}`; i++;
    //console.log(safeObj.title);

    if (cleanObj !== null) {
      const [title         , link         , image         ,  description        ] = 
            [cleanObj.title, cleanObj.link, cleanObj.image, cleanObj.description];

      const elemns = `
      <div class="card" id="${id}">
        <header>
          <h3 class="theme-title">
            <a></a>
          </h3>
          <i class="fas fa-chevron-circle-down"></i>
        </header>
        <a class="meta">
          <img>
          <p class="description"></p>
        </a>
      </div>
      `;
      
      let container = document.getElementById('main_content');
          container.insertAdjacentHTML('beforeend', elemns);

      let card      = document.getElementById(id),
          titlehead = card.getElementsByTagName('header')[0]
                     .getElementsByClassName('theme-title')[0],
          meta      = card.getElementsByClassName('meta')[0],
          img       = card.getElementsByTagName('img')[0];

      
      // 100% security
      meta.href = titlehead.href = link;
      img.alt   = title;
      titlehead.getElementsByTagName('a')[0].innerText = title;
      img.src   = image;
      meta.getElementsByClassName('description')[0].innerText = description;
    }
  });
});

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
