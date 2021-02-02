"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var cleanStuff = function cleanStuff(obj) {
  // clean main checks // weird, but useful for security reason
  var safObj = {},
      // will need help (clean more the string to avoid escaped characters)
  cleanString = new RegExp(/"|'/, 'g'),
      bugs = [];

  try {
    // names
    var keys = Object.keys(obj); // object

    if (_typeof(obj) !== 'object') bugs.push('Only objects allowed.');

    if (keys.length === 4) {
      if (keys[0] !== 'title' || typeof obj[keys[0]] !== 'string' || keys[1] !== 'link' || typeof obj[keys[1]] !== 'string' || keys[2] !== 'description' || typeof obj[keys[2]] !== 'string' || keys[3] !== 'image' || typeof obj[keys[3]] !== 'string') bugs.push('Verify name of object keys, respectively, it must be: title, link, description, image. All must be strings types without escaped characters.');else {
        var props = keys.map(function (k) {
          return obj[k];
        });
        props = props.map(function (w) {
          return w.replace(cleanString, '');
        }); // parse already

        var _ref = [props[0], props[1], props[2], props[3]];
        safObj.title = _ref[0];
        safObj.link = _ref[1];
        safObj.description = _ref[2];
        safObj.image = _ref[3];
      }
    } else bugs.push('Only 4 object keys allowed.'); // all bugs


    if (bugs.length !== 0) throw bugs.length;
  } catch (e) {
    console.log("Theme called ".concat(obj.title, " has the following bug(s), please resolve (").concat(e, "):\n").concat(bugs.join('\n')));
    return null;
  } // need to verify image manually


  return safObj;
}; // count each card to parse 


fetch('themes.json').then(function (data) {
  return data.json();
}).then(function (parsedData) {
  var i = 0;
  parsedData.forEach(function (entry) {
    var cleanObj = cleanStuff(entry),
        id = "card-".concat(i);
    i++; //console.log(safeObj.title);

    if (cleanObj !== null) {
      var _ref2 = [cleanObj.title, cleanObj.link, cleanObj.image, cleanObj.description],
          title = _ref2[0],
          link = _ref2[1],
          image = _ref2[2],
          description = _ref2[3];
      var elemns = "\n      <div class=\"card\" id=\"".concat(id, "\">\n        <header>\n          <h3 class=\"theme-title\">\n            <a></a>\n          </h3>\n          <i class=\"fas fa-chevron-circle-down\"></i>\n        </header>\n        <a class=\"meta\">\n          <img>\n          <p class=\"description\"></p>\n        </a>\n      </div>\n      ");
      var container = document.getElementById('main_content');
      container.insertAdjacentHTML('beforeend', elemns);
      var card = document.getElementById(id),
          titlehead = card.getElementsByTagName('header')[0].getElementsByClassName('theme-title')[0],
          meta = card.getElementsByClassName('meta')[0],
          img = card.getElementsByTagName('img')[0]; // 100% security

      meta.href = titlehead.href = link;
      img.alt = title;
      titlehead.getElementsByTagName('a')[0].innerText = title;
      img.src = image;
      meta.getElementsByClassName('description')[0].innerText = description;
    }
  });
}); // Themes

var prefDark = window.matchMedia("(prefers-color-scheme: dark)").matches,
    prefTheme = localStorage['theme'],
    themeTrigger = document.getElementById('js-themeSwitcher'),
    themeTriggerIcon = themeTrigger.querySelector('i');

var toggleTheme = function toggleTheme() {
  document.documentElement.classList.toggle('nightmode');
  document.documentElement.classList.toggle('daymode');
  themeTriggerIcon.classList.toggle('fa-sun');
  themeTriggerIcon.classList.toggle('fa-moon');
};

if (prefDark) {
  document.documentElement.classList.add('nightmode');
  themeTriggerIcon.classList.remove('fa-moon');
  themeTriggerIcon.classList.add('fa-sun');
}

if (!prefDark) {
  document.body.classList.add('daymode');
}

if (prefTheme === 'day') {
  toggleTheme();
} else localStorage['theme'] = 'night';

themeTrigger.addEventListener('click', function (event) {
  if (localStorage['theme'] === 'night') localStorage['theme'] = 'day';else localStorage['theme'] = 'night';
  toggleTheme();
});