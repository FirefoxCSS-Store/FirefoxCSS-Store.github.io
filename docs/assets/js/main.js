"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Card = /*#__PURE__*/function () {
  function Card(data, id) {
    _classCallCheck(this, Card);

    this._id = id + 1;
    this._title = this.sanatise(data.title);
    this._description = this.sanatise(data.description);
    this._link = this.sanatise(data.link);
    this._image = this.sanatise(data.image);
  }

  _createClass(Card, [{
    key: "sanatise",
    value: function sanatise(unsanatisedInput) {
      var tempEl = document.createElement('div');
      tempEl.innerText = unsanatisedInput;
      var sanatisedOutput = tempEl.innerHTML;
      return sanatisedOutput;
    }
  }, {
    key: "render",
    value: function render(outputContainer) {
      var template = "\n    <div id=\"theme-".concat(this._id, "\" class=\"card\">\n      <header>\n        <h3 class=\"theme-title\">").concat(this._title, "</h3>\n        <a href=\"").concat(this._link, "\">\n          <i class=\"fas fa-chevron-circle-down\"></i>\n        </a>\n      </header>\n      <div class=\"meta\">\n        <a href=\"").concat(this._link, "\">\n          <img src=\"").concat(this._image, "\">\n          <p class=\"description\">").concat(this._description, "</p>\n        </a>\n      </div>\n      <div class=\"button-wrapper\">\n        <button class=\"btn btn-lightbox\" type=\"button\" onClick=\"lightbox(").concat(this._id, ")\"><i class=\"fas fa-search-plus\"></i> Enlarge</button>\n        <a href=\"").concat(this._link, "\"><button class=\"btn btn-download\" type=\"button\"><i class=\"fas fa-file-download\"></i> Download</button></a>\n      </div>\n    </div>\n    ");
      outputContainer.insertAdjacentHTML('beforeend', template);
    }
  }]);

  return Card;
}();

function lightbox(id) {
  var card = document.getElementById("theme-".concat(id));
  var themeTitle = card.querySelector('h3');
  var img = card.querySelector('img');
  var template = "\n  <div id=\"lightbox\" onclick=\"this.remove()\">\n    <h2>".concat(themeTitle.innerText, "</h2>\n    <img src=\"").concat(img.src, "\">\n  </div>\n  ");
  document.body.insertAdjacentHTML('beforeend', template);
}

(function () {
  // IIFE to avoid globals

  /*  Load Content
   *  ============
   */
  var outputContainer = document.getElementById('themes_container');

  if (outputContainer) {
    fetch('themes.json').then(function (data) {
      return data.json();
    }).then(function (parsedData) {
      // sort from the most recent theme added
      // temporary since we're going to add a button to sort
      // in different ways
      parsedData.reverse();
      parsedData.forEach(function (entry, index) {
        var card = new Card(entry, index);
        card.render(outputContainer);
      });
    });
  }
  /*  Theme Handling
   *  ==============
   */


  var systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'night' : 'day',
      themeTrigger = document.getElementById('js-themeSwitcher'),
      themeTriggerIcon = themeTrigger.querySelector('i'); // when local storage is not populated set the system preferrence as value

  if (!localStorage['theme']) localStorage['theme'] = systemPref === 'day' ? 'day' : 'night'; // set nightmode when according to local storage

  if (localStorage['theme'] === 'night') {
    themeTriggerIcon.classList.toggle('fa-sun');
    themeTriggerIcon.classList.toggle('fa-moon');
    document.documentElement.classList.add('nightmode');
  } else {
    document.documentElement.classList.add('daymode');
  }

  function toggleTheme() {
    document.documentElement.classList.toggle('nightmode');
    document.documentElement.classList.toggle('daymode');
    themeTriggerIcon.classList.toggle('fa-sun');
    themeTriggerIcon.classList.toggle('fa-moon'); // update local storage

    if (localStorage['theme'] === 'night') localStorage['theme'] = 'day';else localStorage['theme'] = 'night';
  }

  themeTrigger.addEventListener('click', function (event) {
    return toggleTheme();
  });
})();