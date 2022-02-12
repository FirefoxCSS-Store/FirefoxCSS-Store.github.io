"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//@ts-check
// ============================================================================
// Current browser selector
// @ts-ignore
var
/** @type {HTMLSelectElement} */
choice = document.getElementById('browser');

function getCurrentBrowser() {
  return localStorage.getItem('browser') || 'select';
}

function setCurrentBrowser(browser) {
  var choiceTrigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  localStorage.setItem('browser', browser);

  if (!choiceTrigger) {
    updateChoicePrompt();
  }
}

function setup() {
  choice.onchange = function () {
    setCurrentBrowser(choice.value, true);
  };
}

function updateChoicePrompt() {
  choice.value = getCurrentBrowser(); // @ts-ignore

  var
  /** @type {HTMLSelectElement} */
  prompt = document.getElementById('popup-browser');

  if (prompt) {
    prompt.value = getCurrentBrowser();
  } // @ts-ignore


  var
  /** @type {HTMLButtonElement} */
  prompt_next = document.getElementById('popup-browser-next');

  if (prompt_next) {
    prompt_next.disabled = choice.value === 'select';
  }
}

function sanatise(unsanatisedInput) {
  var tempEl = document.createElement('div');
  tempEl.innerText = unsanatisedInput;
  var sanatisedOutput = tempEl.innerHTML;
  return sanatisedOutput;
}

var Popup = /*#__PURE__*/function () {
  function Popup(data) {
    _classCallCheck(this, Popup);

    this._title = sanatise(data.title);
    this._description = sanatise(data.description);
    this._link = sanatise(data.link);
    this._image = sanatise(data.image);
    this._data = data;
  }

  _createClass(Popup, [{
    key: "render",
    value: function render() {
      var _this = this;

      var stableEnableOptions = ['toolkit.legacyUserProfileCustomizations.stylesheets', 'layers.acceleration.force-enabled', 'gfx.webrender.all', 'gfx.webrender.enabled', 'layout.css.backdrop-filter.enabled', 'svg.context-properties.content.enabled'];
      var nightlyEnableOptions = ['extensions.experiments.enabled'].concat(stableEnableOptions);
      removePopup();
      createPopup("\n      <div id=\"select-browser\" style=\"display: none\">\n        <h1>Select a browser</h1>\n        <select id=\"popup-browser\">\n          <option value=\"select\">Select a browser</option>\n          <option value=\"firefox\">Firefox</option>\n          <option value=\"firefox-esr\">Firefox ESR</option>\n          <option value=\"firefox-beta\">Firefox Beta</option>\n          <option value=\"firefox-dev\">Firefox Dev </option>\n          <option value=\"firefox-nightly\">Firefox Nightly</option>\n          <option value=\"waterfox\">Waterfox</option>\n          <option value=\"pulse\">Pulse browser</option>\n        </select>\n        <button id=\"select-browser-next\">Next</button>\n      </div>\n\n      <div id=\"stable-browser\" style=\"display: none;\">\n        <h1>Installing on Firefox Stable and Beta</h1>\n\n        <ol>\n          <li>Download the theme <a href=\"".concat(this._link, "\">from the git repository</a>. If it is a Github repo, you can download it by clicking the big green \"Code\" button and click \"Download.zip\"</li>\n          <li>Open <code>about:config</code></li>\n          <li>A dialog will warn you, but ignore t, just doit. Press the \"I accept the risk!\" button.</li>\n          <li>Search for these and enable each of them:\n            <ul>\n              ").concat(stableEnableOptions.map(function (option) {
        return "<li><code>".concat(option, "</code></li>");
      }).join(''), "\n            </ul>\n          </li>\n          <li>Go to your Firefox profile:\n            <ul>\n              <li>Linux - <code>$HOME/.mozilla/firefox/XXXXXXX.default-XXXXXX/</code>.</li>\n              <li>Windows 10 - <code>C:Users<USERNAME>AppDataRoamingMozillaFirefoxProfilesXXXXXXX.default-XXXXXX</code>.</li>\n              <li>macOS - <code>Users/<USERNAME>/Library/Application Support/Firefox/Profiles/XXXXXXX.default-XXXXXXX</code>.</li>\n            </ul>\n          </li>\n          <li>\n            Create a folder and name it <code>chrome</code>, then assuming that \n            you already have cloned this repo, just copy the theme to \n            <code>chrome</code> folder.\n          </li>\n          <li>Restart Firefox</li>\n        </ol>\n      </div>\n\n      <div id=\"nightly-browser\" style=\"display: none;\">\n        <h1>Installing on Firefox Developer Edition and Nightly</h1>\n\n        <ol>\n          <li>Open <code>about:config</code></li>\n          <li>A dialog will warn you, but ignore t, just doit. Press the \"I accept the risk!\" button.</li>\n          <li>Search for <code>xpinstall.signatures.required</code> and disable it.</li>\n          <li>Search for these and enable each of them:\n            <ul>\n              ").concat(nightlyEnableOptions.map(function (option) {
        return "<li><code>".concat(option, "</code></li>");
      }).join(''), "\n            </ul>\n          </li>\n          <li>\n            You are now ready to install the theme. Simply clock the button below.\n          </li>\n        </ol>\n\n        <button>Install theme now</button>\n      </div>\n\n      <div id=\"forked-browser\" style=\"display: none;\">\n        <h1>Installing on Waterfox and Pulse Browser</h1>\n\n        <p>You are now ready to install the theme. Simply clock the button below.</p>\n\n        <button>Install theme now</button>\n      </div>\n\n      <button type=\"button\" class=\"btn btn-close-lightbox\" onClick=\"removeLightbox()\"><i class=\"fas fa-times-circle\"></i> Close</button>\n\n    "), true); // Prevent the popup from closing when the user clicks on a UI element

      document.getElementById('select-browser').addEventListener('click', function (e) {
        return e.preventDefault();
      });
      var selectedBrowser = getCurrentBrowser();

      if (selectedBrowser === 'select') {
        document.getElementById('select-browser').style.display = 'block';
        var next = document.getElementById('select-browser-next');
        next.addEventListener('click', function () {
          var selectedBrowser = document.getElementById('popup-browser').value;
          setCurrentBrowser(selectedBrowser);

          _this.changeBrowser(selectedBrowser);
        });
      } else {
        this.changeBrowser(selectedBrowser);
      }
    }
  }, {
    key: "changeBrowser",
    value: function changeBrowser(selectedBrowser) {
      var oldElements = ['stable-browser', 'select-browser', 'nightly-browser', 'forked-browser'];

      if (selectedBrowser === 'firefox' || selectedBrowser === 'firefox-beta' || selectedBrowser === 'firefox-esr') {
        document.getElementById('stable-browser').style.display = 'block';
      } else if (selectedBrowser === 'firefox-nightly' || selectedBrowser === 'firefox-dev') {
        document.getElementById('nightly-browser').style.display = 'block';
      } else if (selectedBrowser === 'waterfox' || selectedBrowser === 'pulse') {
        document.getElementById('forked-browser').style.display = 'block';
      } else {
        throw new Error("Unknown browser: ".concat(selectedBrowser));
      }
    }
  }]);

  return Popup;
}();

var Card = /*#__PURE__*/function () {
  function Card(data, id) {
    _classCallCheck(this, Card);

    this._id = id + 1;
    this._title = sanatise(data.title);
    this._description = sanatise(data.description);
    this._link = sanatise(data.link);
    this._image = sanatise(data.image);
  }

  _createClass(Card, [{
    key: "render",
    value: function render(outputContainer) {
      var template = "\n    <div id=\"theme-".concat(this._id, "\" class=\"card\">\n      <header>\n        <h3 class=\"theme-title\">").concat(this._title, "</h3>\n        <a href=\"").concat(this._link, "\">\n          <i class=\"fas fa-chevron-circle-down\"></i>\n        </a>\n      </header>\n      <div class=\"meta\">\n        <a href=\"").concat(this._link, "\" tabindex=\"-1\">\n          <img src=\"").concat(this._image, "\">\n          <p class=\"description\">").concat(this._description, "</p>\n        </a>\n      </div>\n      <div class=\"button-wrapper\">\n        <button class=\"btn btn-lightbox\" type=\"button\" onClick=\"createLightbox(").concat(this._id, ")\"><i class=\"fas fa-search-plus\"></i> Enlarge</button>\n        <a class=\"btn btn-download\" onclick=\"new Popup({}).render()\"><i class=\"fas fa-file-download\"></i> Download</a>\n      </div>\n    </div>\n    ");
      outputContainer.insertAdjacentHTML('beforeend', template);
    }
  }]);

  return Card;
}();

var removePopup = function removePopup() {
  var _document$getElementB;

  return (_document$getElementB = document.getElementById('lightbox')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.remove();
};

var removeLightbox = removePopup;

function createPopup(content) {
  var isCard = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var container = document.getElementById('themes_container');
  var template = "<div id=\"lightbox\" class=\"".concat(isCard ? 'lightbox-card' : '', "\" ").concat(!isCard ? 'onclick="this.remove()"' : '', ">").concat(content, "</div>");
  container.innerHTML += template;
}

function createLightbox(id) {
  var card = document.getElementById("theme-".concat(id));
  var themeTitle = card.querySelector('h3');
  var img = card.querySelector('img');
  var template = "\n  <div id=\"lightbox\" onclick=\"this.remove()\">\n    <h2>".concat(themeTitle.innerText, "</h2>\n    <img src=\"").concat(img.src, "\">\n    <button type=\"button\" class=\"btn btn-close-lightbox\" onClick=\"removeLightbox\"><i class=\"fas fa-times-circle\"></i> Close</button>\n  </div>\n  ");
  createPopup(template);
}

(function () {
  // IIFE to avoid globals
  // Setup browser select
  // ====================
  setup();
  /*  SEARCH Parameter Handling
   *  ======================
   */

  document.getElementById('searchInput').addEventListener('keydown', function (e) {
    if (e.key === "Enter") toggleSortType(false);
  });
  document.getElementById('searchButton').addEventListener('click', function () {
    return toggleSortType(false);
  });
  /*  Load Content
   *  ============
   */
  // add our sorting button

  var sortTrigger = document.getElementById('js-sortSwitcher');
  sortTrigger.addEventListener('click', function () {
    return toggleSortType(true);
  }); // When localstorage is not set, use "latest" order type

  if (!localStorage['sort']) localStorage['sort'] = 'latest';

  function repeatToggle(nextType) {
    localStorage['sort'] = nextType;
    return toggleSortType(false);
  }

  function toggleSortType(change) {
    if (document.querySelectorAll('.card')) document.querySelectorAll('.card').forEach(function (e) {
      return e.remove();
    });
    fetch('themes.json').then(function (data) {
      return data.json();
    }).then(function (parsedData) {
      var search = document.getElementById('searchInput').value;

      if (search) {
        var matches = function matches(text, partial) {
          return text.toLowerCase().indexOf(partial.toLowerCase()) > -1;
        };

        var parsedAsArray = Object.entries(parsedData);
        var searchResults = parsedAsArray.filter(function (element) {
          return matches("".concat(element[1].title, ", ").concat(element[1].tags), search);
        });
        searchResults.forEach(function (result) {
          var card = new Card(result[1], +result[0]);
          card.render(outputContainer);
        });
        sortTrigger.title = "\"".concat(search, "\"");
        return;
      }

      switch (localStorage['sort']) {
        // sort from the oldest theme added
        case 'latest':
          if (change) return repeatToggle('random');
          parsedData.reverse();
          break;
        // sort randomly

        case 'random':
          if (change) return repeatToggle('oldest');

          for (var i = parsedData.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var _ref = [parsedData[j], parsedData[i]];
            parsedData[i] = _ref[0];
            parsedData[j] = _ref[1];
          }

          break;
        // sort from the most recent theme added

        default:
          if (change) return repeatToggle('latest');
      } // TODO: make a better way to preview the current sorting


      sortTrigger.title = localStorage['sort'];
      parsedData.forEach(function (entry, index) {
        var card = new Card(entry, index);
        card.render(outputContainer);
      });
    });
  } // add themes


  var outputContainer = document.getElementById('themes_container');
  if (outputContainer) toggleSortType(false);
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

  themeTrigger.addEventListener('click', function () {
    return toggleTheme();
  });
})();