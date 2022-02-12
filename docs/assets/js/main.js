"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
      createPopup("\n      <div id=\"select-browser\" style=\"display: none\">\n          <h1>Select a browser</h1>\n\n          <div id=\"browser-grid\" class=\"install-option\">\n              <div class=\"browser-card\" id=\"select-stable\">\n                  <img src=\"https://www.mozilla.org/media/protocol/img/logos/firefox/browser/logo.eb1324e44442.svg\" alt=\"Firefox stable icon\" />\n                  <h2>Firefox Stable or Beta</h2>\n              </div>\n              <div class=\"browser-card\" id=\"select-dev\">\n                  <img src=\"https://www.mozilla.org/media/protocol/img/logos/firefox/browser/developer/logo.41d42822c8fb.svg\" alt=\"Firefox developer edition icon\" />\n                  <h2>Firefox Developer Edition and Nightly</h2>\n              </div>\n              <div class=\"browser-card\" id=\"select-waterfox\">\n                  <img src=\"https://www.waterfox.net/img/logo.svg\" alt=\"Waterfox icon\" />\n                  <h2>Waterfox or Pulse browser</h2>\n              </div>\n          </div>\n      </div>\n\n      <div id=\"stable-browser\" style=\"display: none;\" class=\"install-option\">\n          <h1>Installing on Firefox Stable and Beta</h1>\n\n          <ol>\n              <li>Download the theme <a href=\"".concat(this._link, "\">from the git repository</a>. If it is a Github repo, you can download it by clicking the big green \"Code\" button and click \"Download.zip\"</li>\n              <li>Open <code>about:config</code></li>\n              <li>A dialog will warn you, but ignore t, just doit. Press the \"I accept the risk!\" button.</li>\n              <li>Search for these and enable each of them:\n              <ul>\n                  ").concat(stableEnableOptions.map(function (option) {
        return "<li><code>".concat(option, "</code></li>");
      }).join(''), "\n              </ul>\n              </li>\n              <li>Go to your Firefox profile:\n              <ul>\n                  <li>Linux - <code>$HOME/.mozilla/firefox/XXXXXXX.default-XXXXXX/</code>.</li>\n                  <li>Windows 10 - <code>C:Users&lt;USERNAME&gt;AppDataRoamingMozillaFirefoxProfilesXXXXXXX.default-XXXXXX</code>.</li>\n                  <li>macOS - <code>Users/&lt;USERNAME&gt;/Library/Application Support/Firefox/Profiles/XXXXXXX.default-XXXXXXX</code>.</li>\n              </ul>\n              </li>\n              <li>\n              Create a folder and name it <code>chrome</code>, then assuming that \n              you already have cloned this repo, just copy the theme to \n              <code>chrome</code> folder.\n              </li>\n              <li>Restart Firefox</li>\n          </ol>\n      </div>\n\n      <div id=\"nightly-browser\" style=\"display: none;\" class=\"install-option\">\n          <h1>Installing on Firefox Developer Edition and Nightly</h1>\n\n          <ol>\n              <li>Open <code>about:config</code></li>\n              <li>A dialog will warn you, but ignore t, just doit. Press the \"I accept the risk!\" button.</li>\n              <li>Search for <code>xpinstall.signatures.required</code> and disable it.</li>\n              <li>Search for these and enable each of them:\n              <ul>\n                  ").concat(nightlyEnableOptions.map(function (option) {
        return "<li><code>".concat(option, "</code></li>");
      }).join(''), "\n              </ul>\n              </li>\n              <li>\n              You are now ready to install the theme. Simply clock the button below.\n              </li>\n          </ol>\n\n          <div class=\"addon-install-options\"></div>\n      </div>\n\n      <div id=\"forked-browser\" style=\"display: none;\" class=\"install-option\">\n          <h1>Installing on Waterfox and Pulse Browser</h1>\n\n          <p>You are now ready to install the theme. Simply clock the button below.</p>\n\n          <div class=\"addon-install-options\"></div>\n      </div>\n\n      <button type=\"button\" class=\"btn btn-close-lightbox\" onClick=\"removeLightbox()\"><i class=\"fas fa-times-circle\"></i> Close</button>\n    "), true);
      document.getElementById('select-stable').addEventListener('click', function () {
        return _this.changeBrowser('firefox-stable', true);
      });
      document.getElementById('select-dev').addEventListener('click', function () {
        return _this.changeBrowser('firefox-dev', true);
      });
      document.getElementById('select-waterfox').addEventListener('click', function () {
        return _this.changeBrowser('waterfox', true);
      }); // Prevent the popup from closing when the user clicks on a UI element

      document.getElementById('select-browser').addEventListener('click', function (e) {
        return e.preventDefault();
      });
      console.log(this._data); // If there is no experiment xpi support, we should send them straight to
      // the stable instructions

      var selectedBrowser = this._data.experiment_xpi ? getCurrentBrowser() : 'firefox';

      if (selectedBrowser === 'select') {
        document.getElementById('select-browser').style.display = 'block';
      } else {
        this.changeBrowser(selectedBrowser);
      } // If there is no experiment attached, do not perform logic related to it


      if (!this._data.experiment_xpi) return;
      var addonClick = document.getElementsByClassName('addon-install-options');

      var _iterator = _createForOfIteratorHelper(addonClick),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var container = _step.value;

          var _loop = function _loop(style) {
            var button = document.createElement('button');
            button.classList.add('btn');
            button.innerText = style;
            button.addEventListener('click', function () {
              return location.href = _this._data.experiment_xpi[style];
            });
            container.appendChild(button);
          };

          for (var style in this._data.experiment_xpi) {
            _loop(style);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "changeBrowser",
    value: function changeBrowser(selectedBrowser) {
      var save = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (save) setCurrentBrowser(selectedBrowser);
      var oldElements = ['stable-browser', 'select-browser', 'nightly-browser', 'forked-browser'];
      oldElements.forEach(function (element) {
        return document.getElementById(element).style.display = 'none';
      });

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
}(); // Global variable to store theme data
// TODO: Fix this gankness with something a bit better


var themeData = {};

var Card = /*#__PURE__*/function () {
  function Card(data, id) {
    _classCallCheck(this, Card);

    this._id = id + 1;
    this._title = sanatise(data.title);
    this._description = sanatise(data.description);
    this._link = sanatise(data.link);
    this._image = sanatise(data.image);
    themeData[this._id] = data;
  }

  _createClass(Card, [{
    key: "render",
    value: function render(outputContainer) {
      var template = "\n    <div id=\"theme-".concat(this._id, "\" class=\"card\">\n      <header>\n        <h3 class=\"theme-title\">").concat(this._title, "</h3>\n        <a href=\"").concat(this._link, "\">\n          <i class=\"fas fa-chevron-circle-down\"></i>\n        </a>\n      </header>\n      <div class=\"meta\">\n        <a href=\"").concat(this._link, "\" tabindex=\"-1\">\n          <img src=\"").concat(this._image, "\">\n          <p class=\"description\">").concat(this._description, "</p>\n        </a>\n      </div>\n      <div class=\"button-wrapper\">\n        <button class=\"btn btn-lightbox\" type=\"button\" onClick=\"createLightbox(").concat(this._id, ")\"><i class=\"fas fa-search-plus\"></i> Enlarge</button>\n        <a class=\"btn btn-download\" onclick=\"new Popup(themeData[").concat(this._id, "]).render()\"><i class=\"fas fa-file-download\"></i> Download</a>\n      </div>\n    </div>\n    ");
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