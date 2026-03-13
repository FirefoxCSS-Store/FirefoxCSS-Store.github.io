"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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

  var running_sort = 0;
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
    var my_run = ++running_sort;
    localStorage.sort = kind;

    // Remove all themes cards from the page.
    var cards_container = document.getElementById('themes_container');
    if (cards_container) cards_container.innerHTML = '';
    fetch('themes.json').then(function (data) {
      return data.json();
    }).then(/*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(data) {
        var matches, i, j, _ref2, _iterator, _step, _step$value, index, entry, card, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              data = Object.entries(data);
              if (filter) {
                /**
                 * Match any substring (partial) from a string (text).
                 * @param {string} text
                 * @param {string} partial
                 */
                matches = function matches(text, partial) {
                  return text.toLowerCase().indexOf(partial.toLowerCase()) > -1;
                };
                data = data.filter(function (element) {
                  return matches("".concat(element[1].title, ", ").concat(element[1].tags), search.value);
                });
              }
              _t = localStorage.sort;
              _context.n = _t === 'latest' ? 1 : _t === 'updated' ? 2 : _t === 'stars' ? 3 : _t === 'random' ? 4 : 5;
              break;
            case 1:
              data.reverse();
              return _context.a(3, 5);
            case 2:
              // item1.attr.localeCompare(item2.attr);
              data.sort(function (a, b) {
                return b[1].pushed_at.localeCompare(a[1].pushed_at);
              });
              return _context.a(3, 5);
            case 3:
              data.sort(function (a, b) {
                return b[1].stargazers_count - a[1].stargazers_count;
              });
              return _context.a(3, 5);
            case 4:
              for (i = data.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                _ref2 = [data[j], data[i]];
                data[i] = _ref2[0];
                data[j] = _ref2[1];
              }
              return _context.a(3, 5);
            case 5:
              _iterator = _createForOfIteratorHelper(data);
              _context.p = 6;
              _iterator.s();
            case 7:
              if ((_step = _iterator.n()).done) {
                _context.n = 10;
                break;
              }
              _step$value = _slicedToArray(_step.value, 2), index = _step$value[0], entry = _step$value[1];
              if (!(running_sort !== my_run)) {
                _context.n = 8;
                break;
              }
              return _context.a(2);
            case 8:
              card = new Card(entry, index);
              card.render(outputContainer);
              _context.n = 9;
              return new Promise(function (r) {
                return setTimeout(r, 444);
              });
            case 9:
              _context.n = 7;
              break;
            case 10:
              _context.n = 12;
              break;
            case 11:
              _context.p = 11;
              _t2 = _context.v;
              _iterator.e(_t2);
            case 12:
              _context.p = 12;
              _iterator.f();
              return _context.f(12);
            case 13:
              return _context.a(2);
          }
        }, _callee, null, [[6, 11, 12, 13]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
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
    themeTriggerIcon.classList.remove('fa-sun');
    themeTriggerIcon.classList.add('fa-moon');
    document.documentElement.classList.add('nightmode');
  } else {
    document.documentElement.classList.add('daymode');
  }
  function toggleTheme() {
    document.documentElement.classList.toggle('nightmode');
    document.documentElement.classList.toggle('daymode');

    // update local storage
    if (localStorage['theme'] === 'night') {
      localStorage['theme'] = 'day';
      themeTriggerIcon.classList.add('fa-sun');
      themeTriggerIcon.classList.remove('fa-moon');
    } else {
      localStorage['theme'] = 'night';
      themeTriggerIcon.classList.remove('fa-sun');
      themeTriggerIcon.classList.add('fa-moon');
    }
  }
  themeTrigger.addEventListener('click', toggleTheme);
})();