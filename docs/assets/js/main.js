"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function sanatise(unsanatisedInput) {
  var tempEl = document.createElement('div');
  tempEl.innerText = unsanatisedInput;
  var sanatisedOutput = tempEl.innerHTML;
  return sanatisedOutput;
}
var Card = /*#__PURE__*/function () {
  function Card(data, id) {
    _classCallCheck(this, Card);
    this._id = id + 1;
    this._title = sanatise(data.title);
    this._description = sanatise(data.description);
    this._link = sanatise(data.link);
    this._image = sanatise(data.image);
  }
  return _createClass(Card, [{
    key: "render",
    value: function render(outputContainer) {
      var template = "\n    <div id=\"theme-".concat(this._id, "\" class=\"card\">\n      <header>\n        <h3 class=\"theme-title\">").concat(this._title, "</h3>\n        <a href=\"").concat(this._link, "\">\n          <i class=\"fas fa-chevron-circle-down\"></i>\n        </a>\n      </header>\n      <div class=\"meta\">\n        <a href=\"").concat(this._link, "\" tabindex=\"-1\">\n          <img src=\"").concat(this._image, "\">\n          <p class=\"description\">").concat(this._description, "</p>\n        </a>\n      </div>\n      <div class=\"button-wrapper\">\n        <button class=\"btn btn-lightbox\" type=\"button\" onClick=\"createLightbox(").concat(this._id, ")\"><i class=\"fas fa-search-plus\"></i> Enlarge</button>\n        <a href=\"").concat(this._link, "\" class=\"btn btn-download\"><i class=\"fas fa-file-download\"></i> Download</a>\n      </div>\n    </div>\n    ");
      outputContainer.insertAdjacentHTML('beforeend', template);
    }
  }]);
}();
var removeLightbox = function removeLightbox() {
  return document.body.getElementsById('lightbox').remove();
};
function createLightbox(id) {
  var card = document.getElementById("theme-".concat(id));
  var themeTitle = card.querySelector('h3');
  var img = card.querySelector('img');
  var template = "\n  <div id=\"lightbox\" onclick=\"this.remove()\">\n    <h2>".concat(themeTitle.innerText, "</h2>\n    <img src=\"").concat(img.src, "\">\n    <button type=\"button\" class=\"btn btn-close-lightbox\" onClick=\"removeLightbox\"><i class=\"fas fa-times-circle\"></i> Close</button>\n  </div>\n  ");
  card.insertAdjacentHTML('afterend', template);
}
(function () {
  // IIFE to avoid globals

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
  });

  // When localstorage is not set, use "latest" order type
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
      }

      // TODO: make a better way to preview the current sorting
      sortTrigger.title = localStorage['sort'];
      parsedData.forEach(function (entry, index) {
        var card = new Card(entry, index);
        card.render(outputContainer);
      });
    });
  }

  // add themes
  var outputContainer = document.getElementById('themes_container');
  if (outputContainer) toggleSortType(false);

  /*  Theme Handling
   *  ==============
   */

  var systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'night' : 'day',
    themeTrigger = document.getElementById('js-themeSwitcher'),
    themeTriggerIcon = themeTrigger.querySelector('i');

  // when local storage is not populated set the system preferrence as value
  if (!localStorage['theme']) localStorage['theme'] = systemPref === 'day' ? 'day' : 'night';

  // set nightmode when according to local storage
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
    themeTriggerIcon.classList.toggle('fa-moon');

    // update local storage
    if (localStorage['theme'] === 'night') localStorage['theme'] = 'day';else localStorage['theme'] = 'night';
  }
  themeTrigger.addEventListener('click', function () {
    return toggleTheme();
  });
})();