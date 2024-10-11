"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
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

  var search = /** @type {HTMLInputElement} */document.getElementById('searchInput');
  search.addEventListener('keydown', function (e) {
    if (e.key === "Enter") sort(localStorage.sort, search.value);
  });
  var search_button = /** @type {HTMLInputElement} */document.getElementById('searchButton');
  search_button.addEventListener('click', function () {
    return sort(localStorage.sort, search.value);
  });

  /*  Load Content
   *  ============
   */

  /*
   * If sorting is not set yet in `localStorage`,
   * then use as default `latest` kind.
   */
  if (!localStorage.sort) localStorage.sort = 'latest';

  /*
   * Add event to sort when an option is chosen..
   */
  var sort_menu = /** @type {HTMLSelectElement} */document.getElementById('js-sort-menu');
  sort_menu.addEventListener('change', function () {
    var name = /** @type {string} */sort_menu.selectedOptions[0].getAttribute('name');
    sort(name);
  });
  sort(localStorage.sort);
  var current_option = sort_menu.options.namedItem(localStorage.sort);
  if (current_option) current_option.selected = true;

  /**
   * Toggle the sorting type of the themes.
   *
   * @param {string} kind How to sort the themes.
   * @param {string=} filter Term to filter the themes.
   **/
  function sort(kind, filter) {
    localStorage.sort = kind;

    // Remove all themes cards from the page.
    var cards_container = document.getElementById('themes_container');
    if (cards_container) cards_container.innerHTML = '';
    fetch('themes.json').then(function (data) {
      return data.json();
    }).then(function (data) {
      data = Object.entries(data);
      if (filter) {
        /**
         * Match any substring (partial) from a string (text).
         * @param {string} text
         * @param {string} partial
         */
        var matches = function matches(text, partial) {
          return text.toLowerCase().indexOf(partial.toLowerCase()) > -1;
        };
        data = data.filter(function (element) {
          return matches("".concat(element[1].title, ", ").concat(element[1].tags), search.value);
        });
      }
      switch (localStorage.sort) {
        /*
         * Sort from the most recent theme added.
         */
        case 'latest':
          data.reverse();
          break;

        /*
         * Ascending sorting of stars from repositories.
         */
        case 'updated':
          // item1.attr.localeCompare(item2.attr);
          data.sort(function (a, b) {
            return b[1].pushed_at.localeCompare(a[1].pushed_at);
          });
          break;

        /*
         * Ascending sorting of stars from repositories.
         */
        case 'stars':
          data.sort(function (a, b) {
            return b[1].stargazers_count - a[1].stargazers_count;
          });
          break;

        /*
         * Randomly sorting of themes.
         */
        case 'random':
          for (var i = data.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var _ref = [data[j], data[i]];
            data[i] = _ref[0];
            data[j] = _ref[1];
          }
          break;

        /*
         * Sort from the least recent theme added (oldest).
         * Since it's sorted like this by default from the file, do nothing.
         */
        default:
      }
      var _iterator = _createForOfIteratorHelper(data),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            index = _step$value[0],
            entry = _step$value[1];
          var card = new Card(entry, index);
          card.render(outputContainer);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  }

  // add themes
  var outputContainer = document.getElementById('themes_container');

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