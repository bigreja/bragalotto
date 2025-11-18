/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/OverloadYield.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/OverloadYield.js ***!
  \**************************************************************/
/***/ ((module) => {

function _OverloadYield(e, d) {
  this.v = e, this.k = d;
}
module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, o);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regenerator.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regenerator.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var regeneratorDefine = __webpack_require__(/*! ./regeneratorDefine.js */ "./node_modules/@babel/runtime/helpers/regeneratorDefine.js");
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function () {
    return this;
  }), regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (module.exports = _regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorAsync.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsync.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var regeneratorAsyncGen = __webpack_require__(/*! ./regeneratorAsyncGen.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js");
function _regeneratorAsync(n, e, r, t, o) {
  var a = regeneratorAsyncGen(n, e, r, t, o);
  return a.next().then(function (n) {
    return n.done ? n.value : a.next();
  });
}
module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var regenerator = __webpack_require__(/*! ./regenerator.js */ "./node_modules/@babel/runtime/helpers/regenerator.js");
var regeneratorAsyncIterator = __webpack_require__(/*! ./regeneratorAsyncIterator.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js");
function _regeneratorAsyncGen(r, e, t, o, n) {
  return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
}
module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var OverloadYield = __webpack_require__(/*! ./OverloadYield.js */ "./node_modules/@babel/runtime/helpers/OverloadYield.js");
var regeneratorDefine = __webpack_require__(/*! ./regeneratorDefine.js */ "./node_modules/@babel/runtime/helpers/regeneratorDefine.js");
function AsyncIterator(t, e) {
  function n(r, o, i, f) {
    try {
      var c = t[r](o),
        u = c.value;
      return u instanceof OverloadYield ? e.resolve(u.v).then(function (t) {
        n("next", t, i, f);
      }, function (t) {
        n("throw", t, i, f);
      }) : e.resolve(u).then(function (t) {
        c.value = t, i(c);
      }, function (t) {
        return n("throw", t, i, f);
      });
    } catch (t) {
      f(t);
    }
  }
  var r;
  this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () {
    return this;
  })), regeneratorDefine(this, "_invoke", function (t, o, i) {
    function f() {
      return new e(function (e, r) {
        n(t, i, e, r);
      });
    }
    return r = r ? r.then(f, f) : f();
  }, !0);
}
module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorDefine.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorDefine.js ***!
  \******************************************************************/
/***/ ((module) => {

function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  module.exports = _regeneratorDefine = function regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
}
module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorKeys.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorKeys.js ***!
  \****************************************************************/
/***/ ((module) => {

function _regeneratorKeys(e) {
  var n = Object(e),
    r = [];
  for (var t in n) r.unshift(t);
  return function e() {
    for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;
    return e.done = !0, e;
  };
}
module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var OverloadYield = __webpack_require__(/*! ./OverloadYield.js */ "./node_modules/@babel/runtime/helpers/OverloadYield.js");
var regenerator = __webpack_require__(/*! ./regenerator.js */ "./node_modules/@babel/runtime/helpers/regenerator.js");
var regeneratorAsync = __webpack_require__(/*! ./regeneratorAsync.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsync.js");
var regeneratorAsyncGen = __webpack_require__(/*! ./regeneratorAsyncGen.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js");
var regeneratorAsyncIterator = __webpack_require__(/*! ./regeneratorAsyncIterator.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js");
var regeneratorKeys = __webpack_require__(/*! ./regeneratorKeys.js */ "./node_modules/@babel/runtime/helpers/regeneratorKeys.js");
var regeneratorValues = __webpack_require__(/*! ./regeneratorValues.js */ "./node_modules/@babel/runtime/helpers/regeneratorValues.js");
function _regeneratorRuntime() {
  "use strict";

  var r = regenerator(),
    e = r.m(_regeneratorRuntime),
    t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
  function n(r) {
    var e = "function" == typeof r && r.constructor;
    return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
  }
  var o = {
    "throw": 1,
    "return": 2,
    "break": 3,
    "continue": 3
  };
  function a(r) {
    var e, t;
    return function (n) {
      e || (e = {
        stop: function stop() {
          return t(n.a, 2);
        },
        "catch": function _catch() {
          return n.v;
        },
        abrupt: function abrupt(r, e) {
          return t(n.a, o[r], e);
        },
        delegateYield: function delegateYield(r, o, a) {
          return e.resultName = o, t(n.d, regeneratorValues(r), a);
        },
        finish: function finish(r) {
          return t(n.f, r);
        }
      }, t = function t(r, _t, o) {
        n.p = e.prev, n.n = e.next;
        try {
          return r(_t, o);
        } finally {
          e.next = n.n;
        }
      }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;
      try {
        return r.call(this, e);
      } finally {
        n.p = e.prev, n.n = e.next;
      }
    };
  }
  return (module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: function wrap(e, t, n, o) {
        return r.w(a(e), t, n, o && o.reverse());
      },
      isGeneratorFunction: n,
      mark: r.m,
      awrap: function awrap(r, e) {
        return new OverloadYield(r, e);
      },
      AsyncIterator: regeneratorAsyncIterator,
      async: function async(r, e, t, o, u) {
        return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorValues.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorValues.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorValues(e) {
  if (null != e) {
    var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
      r = 0;
    if (t) return t.call(e);
    if ("function" == typeof e.next) return e;
    if (!isNaN(e.length)) return {
      next: function next() {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
  }
  throw new TypeError(_typeof(e) + " is not iterable");
}
module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./src/admin/components/EventsTab.tsx":
/*!********************************************!*\
  !*** ./src/admin/components/EventsTab.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventsTab)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Placeholder */ "flarum/common/components/Placeholder");
/* harmony import */ var flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modals_EventModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modals/EventModal */ "./src/admin/components/modals/EventModal.tsx");
/* harmony import */ var _modals_ResultModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modals/ResultModal */ "./src/admin/components/modals/ResultModal.tsx");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7__);








var EventsTab = /*#__PURE__*/function (_Component) {
  function EventsTab() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    // ... (Kodun üst kısmı aynı)
    _this.selectedSeason = 'all';
    _this.selectedTeam = 'all';
    _this.selectedStatus = 'all';
    _this.sortOrder = 'desc';
    _this.loading = true;
    _this.events = [];
    _this.totalEvents = 0;
    _this.page = 1;
    _this.limit = 20;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(EventsTab, _Component);
  var _proto = EventsTab.prototype;
  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
    this.loadEvents();
  };
  _proto.buildFilters = function buildFilters() {
    var _this2 = this;
    var filters = {};
    var weekIds = [];
    if (this.selectedSeason !== 'all') {
      var weeks = app.store.all('pickem-weeks').filter(function (week) {
        return week.seasonId() == _this2.selectedSeason;
      });
      weekIds.push.apply(weekIds, weeks.map(function (week) {
        return week.id();
      }));
      if (weekIds.length === 0) weekIds.push('0');
      filters.week = weekIds.join(',');
    }
    if (this.selectedTeam !== 'all') {
      filters.team = this.selectedTeam;
    }
    if (this.selectedStatus !== 'all') {
      filters.status = this.selectedStatus;
    }
    return filters;
  };
  _proto.loadEvents = function loadEvents(page) {
    var _this3 = this;
    if (page === void 0) {
      page = 1;
    }
    this.loading = true;
    this.page = page;
    m.redraw();
    var filters = this.buildFilters();
    var sort = this.sortOrder === 'desc' ? '-matchDate' : 'matchDate';
    var offset = (this.page - 1) * this.limit;
    app.store.find('pickem-events', {
      include: 'homeTeam,awayTeam,week',
      filter: filters,
      sort: sort,
      page: {
        limit: this.limit,
        offset: offset
      }
    }).then(function (results) {
      _this3.events = results;
      _this3.totalEvents = results.payload.meta.total;
      _this3.loading = false;
      m.redraw();
    })["catch"](function (error) {
      _this3.loading = false;
      console.error(error);
      m.redraw();
    });
  };
  _proto.view = function view() {
    var _this4 = this;
    var allSeasons = app.store.all('pickem-seasons');
    var allTeams = app.store.all('pickem-teams');
    var total = this.totalEvents;
    var hasEvents = this.events.length > 0;
    var canShowPagination = total > this.limit;
    var totalPages = Math.ceil(total / this.limit);
    // GÜNCELLENDİ: lib.models -> lib.common
    var resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.match');
    return m("div", {
      className: "EventsTab"
    }, m("div", {
      className: "EventsTab-header"
    }, m("h3", null, m("i", {
      className: "fas fa-futbol"
    }), app.translator.trans('huseyinfiliz-pickem.lib.nav.matches')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
      className: "Button Button--primary",
      icon: "fas fa-plus",
      onclick: function onclick() {
        return app.modal.show(_modals_EventModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
          event: null,
          onsave: function onsave() {
            return _this4.loadEvents(_this4.page);
          }
        });
      }
    }, app.translator.trans('huseyinfiliz-pickem.lib.actions.create', {
      resource: resourceName
    }))), m("div", {
      className: "EventsTab-filters"
    }, m("div", {
      className: "FilterGroup"
    }, m("label", null, m("i", {
      className: "fas fa-calendar-alt"
    }), m("span", null, app.translator.trans('huseyinfiliz-pickem.lib.common.season'))), m("select", {
      className: "FormControl",
      value: this.selectedSeason,
      onchange: function onchange(e) {
        _this4.selectedSeason = e.target.value;
        _this4.loadEvents(1);
      }
    }, m("option", {
      value: "all"
    }, app.translator.trans('huseyinfiliz-pickem.lib.filters.all', {
      resource: app.translator.trans('huseyinfiliz-pickem.lib.common.season')
    })), allSeasons.map(function (season) {
      return m("option", {
        value: season.id(),
        key: season.id()
      }, season.name());
    }))), m("div", {
      className: "FilterGroup"
    }, m("label", null, m("i", {
      className: "fas fa-users"
    }), m("span", null, app.translator.trans('huseyinfiliz-pickem.lib.common.team'))), m("select", {
      className: "FormControl",
      value: this.selectedTeam,
      onchange: function onchange(e) {
        _this4.selectedTeam = e.target.value;
        _this4.loadEvents(1);
      }
    }, m("option", {
      value: "all"
    }, app.translator.trans('huseyinfiliz-pickem.lib.filters.all', {
      resource: app.translator.trans('huseyinfiliz-pickem.lib.common.team')
    })), allTeams.map(function (team) {
      return m("option", {
        value: team.id(),
        key: team.id()
      }, team.name());
    }))), m("div", {
      className: "FilterGroup"
    }, m("label", null, m("i", {
      className: "fas fa-info-circle"
    }), m("span", null, app.translator.trans('huseyinfiliz-pickem.lib.common.status'))), m("select", {
      className: "FormControl",
      value: this.selectedStatus,
      onchange: function onchange(e) {
        _this4.selectedStatus = e.target.value;
        _this4.loadEvents(1);
      }
    }, m("option", {
      value: "all"
    }, app.translator.trans('huseyinfiliz-pickem.lib.filters.all', {
      resource: app.translator.trans('huseyinfiliz-pickem.lib.common.status')
    })), m("option", {
      value: "scheduled"
    }, app.translator.trans('huseyinfiliz-pickem.lib.status.scheduled')), m("option", {
      value: "closed"
    }, app.translator.trans('huseyinfiliz-pickem.lib.status.closed')), m("option", {
      value: "finished"
    }, app.translator.trans('huseyinfiliz-pickem.lib.status.finished')))), m("div", {
      className: "FilterGroup"
    }, m("label", null, m("i", {
      className: "fas fa-sort"
    }), m("span", null, app.translator.trans('huseyinfiliz-pickem.lib.filters.sort'))), m("select", {
      className: "FormControl",
      value: this.sortOrder,
      onchange: function onchange(e) {
        _this4.sortOrder = e.target.value;
        _this4.loadEvents(1);
      }
    }, m("option", {
      value: "desc"
    }, app.translator.trans('huseyinfiliz-pickem.lib.filters.newest')), m("option", {
      value: "asc"
    }, app.translator.trans('huseyinfiliz-pickem.lib.filters.oldest')))), (this.selectedSeason !== 'all' || this.selectedTeam !== 'all' || this.selectedStatus !== 'all' || this.sortOrder !== 'desc') && m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
      className: "Button FilterGroup-reset",
      icon: "fas fa-redo",
      onclick: function onclick() {
        _this4.selectedSeason = 'all';
        _this4.selectedTeam = 'all';
        _this4.selectedStatus = 'all';
        _this4.sortOrder = 'desc';
        _this4.loadEvents(1);
      }
    }, app.translator.trans('huseyinfiliz-pickem.lib.filters.reset'))), this.loading ? m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default()), null) : !hasEvents ? m((flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_4___default()), {
      text: app.translator.trans('huseyinfiliz-pickem.lib.messages.no_matches')
    }) : m("table", {
      className: "Table"
    }, m("thead", null, m("tr", null, m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.common.home')), m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.common.away')), m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.match_date')), m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.common.status')), m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.common.score')), m("th", null))), m("tbody", null, this.events.map(function (event) {
      var homeTeam = event.homeTeam();
      var awayTeam = event.awayTeam();
      return m("tr", {
        key: event.id()
      }, m("td", null, m("div", {
        className: "TeamCell"
      }, _this4.renderTeamLogo(homeTeam), m("span", null, homeTeam ? homeTeam.name() : 'N/A'))), m("td", null, m("div", {
        className: "TeamCell"
      }, _this4.renderTeamLogo(awayTeam), m("span", null, awayTeam ? awayTeam.name() : 'N/A'))), m("td", null, event.matchDate() ? new Date(event.matchDate()).toLocaleString() : '-'), m("td", null, m("span", {
        className: "StatusBadge StatusBadge--" + event.status()
      }, app.translator.trans("huseyinfiliz-pickem.lib.status." + event.status()))), m("td", null, event.homeScore() !== null && event.awayScore() !== null ? event.homeScore() + " - " + event.awayScore() : '-'), m("td", null, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
        className: "Button Button--primary",
        icon: "fas fa-edit",
        onclick: function onclick() {
          return app.modal.show(_modals_EventModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
            event: event,
            onsave: function onsave() {
              return _this4.loadEvents(_this4.page);
            }
          });
        }
      }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.edit')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
        className: "Button Button--success",
        icon: "fas fa-check",
        onclick: function onclick() {
          return app.modal.show(_modals_ResultModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
            event: event,
            onsave: function onsave() {
              return _this4.loadEvents(_this4.page);
            }
          });
        }
      }, app.translator.trans('huseyinfiliz-pickem.lib.actions.enter_result')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
        className: "Button Button--danger",
        icon: "fas fa-trash",
        onclick: function onclick() {
          return _this4.deleteEvent(event);
        }
      }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.delete'))));
    }))), canShowPagination && !this.loading && m("nav", {
      className: "Pagination"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
      className: "Button Pagination-button Pagination-previous",
      icon: "fas fa-chevron-left",
      disabled: this.page === 1,
      onclick: function onclick() {
        if (_this4.page > 1) {
          _this4.loadEvents(_this4.page - 1);
        }
      }
    }), m("span", {
      className: "Pagination-info"
    }, app.translator.trans('huseyinfiliz-pickem.lib.pagination.page_info', {
      current: this.page,
      total: totalPages
    })), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
      className: "Button Pagination-button Pagination-next",
      icon: "fas fa-chevron-right",
      disabled: this.page >= totalPages,
      onclick: function onclick() {
        if (_this4.page < totalPages) {
          _this4.loadEvents(_this4.page + 1);
        }
      }
    })));
  };
  _proto.renderTeamLogo = function renderTeamLogo(team) {
    if (!team) {
      return m("div", {
        className: "TeamLogo TeamLogo--letter",
        style: "background-color: #999"
      }, "?");
    }
    var logoUrl = team.logoUrl();
    var teamName = team.name();
    var firstLetter = teamName ? teamName.charAt(0).toUpperCase() : '?';
    if (logoUrl) {
      return m("div", {
        className: "TeamLogo TeamLogo--image"
      }, m("img", {
        src: logoUrl,
        alt: teamName || 'Team',
        onerror: function onerror(e) {
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = "<div class=\"TeamLogo TeamLogo--letter\">" + firstLetter + "</div>";
        }
      }));
    } else {
      return m("div", {
        className: "TeamLogo TeamLogo--letter"
      }, firstLetter);
    }
  };
  _proto.deleteEvent = function deleteEvent(event) {
    var _this5 = this;
    // GÜNCELLENDİ: lib.models -> lib.common
    var resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.match');
    var confirmMessage = flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2___default()(app.translator.trans('huseyinfiliz-pickem.lib.messages.delete_confirm', {
      resource: resourceName
    }));
    if (confirm(confirmMessage)) {
      event["delete"]().then(function () {
        _this5.loadEvents(_this5.page);
      });
    }
  };
  return EventsTab;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/PickemPage.tsx":
/*!*********************************************!*\
  !*** ./src/admin/components/PickemPage.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PickemPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Alert */ "flarum/common/components/Alert");
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _TeamsTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TeamsTab */ "./src/admin/components/TeamsTab.tsx");
/* harmony import */ var _SeasonsTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SeasonsTab */ "./src/admin/components/SeasonsTab.tsx");
/* harmony import */ var _WeeksTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./WeeksTab */ "./src/admin/components/WeeksTab.tsx");
/* harmony import */ var _EventsTab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EventsTab */ "./src/admin/components/EventsTab.tsx");
/* harmony import */ var _SettingsTab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SettingsTab */ "./src/admin/components/SettingsTab.tsx");











var PickemPage = /*#__PURE__*/function (_ExtensionPage) {
  function PickemPage() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _ExtensionPage.call.apply(_ExtensionPage, [this].concat(args)) || this;
    _this.activeTab = 'events';
    _this.loading = true;
    _this.error = null;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(PickemPage, _ExtensionPage);
  var _proto = PickemPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _ExtensionPage.prototype.oninit.call(this, vnode);
    var urlTab = m.route.param('tab');
    if (urlTab && ['events', 'teams', 'seasons', 'weeks', 'settings'].includes(urlTab)) {
      this.activeTab = urlTab;
    }
    this.loadData();
  };
  _proto.loadData = /*#__PURE__*/function () {
    var _loadData = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 1;
            return Promise.all([app.store.find('pickem-teams'), app.store.find('pickem-seasons'), app.store.find('pickem-weeks', {
              include: 'season'
            })]);
          case 1:
            this.error = null;
            _context.next = 3;
            break;
          case 2:
            _context.prev = 2;
            _t = _context["catch"](0);
            console.error('Pickem admin data load error:', _t);
            this.error = _t.message || 'An unknown error occurred while loading data.';
          case 3:
            _context.prev = 3;
            this.loading = false;
            m.redraw();
            return _context.finish(3);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 2, 3, 4]]);
    }));
    function loadData() {
      return _loadData.apply(this, arguments);
    }
    return loadData;
  }();
  _proto.content = function content() {
    var tabContent;
    if (this.loading) {
      tabContent = m("div", {
        className: "LoadingState"
      }, m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default()), null));
    } else if (this.error) {
      tabContent = m((flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_5___default()), {
        type: "error"
      }, this.error);
    } else {
      tabContent = this.renderTabContent();
    }
    return m("div", {
      className: "PickemPage"
    }, m("div", {
      className: "container"
    }, m("div", {
      className: "PickemPage-tabs"
    }, this.renderTab('events', 'fas fa-futbol', app.translator.trans('huseyinfiliz-pickem.lib.nav.matches')), this.renderTab('teams', 'fas fa-users', app.translator.trans('huseyinfiliz-pickem.lib.nav.teams')), this.renderTab('seasons', 'fas fa-calendar-alt', app.translator.trans('huseyinfiliz-pickem.lib.nav.seasons')), this.renderTab('weeks', 'fas fa-calendar-week', app.translator.trans('huseyinfiliz-pickem.lib.nav.weeks')), this.renderTab('settings', 'fas fa-cogs', app.translator.trans('huseyinfiliz-pickem.lib.nav.settings'))), m("div", {
      className: "PickemPage-content"
    }, tabContent)));
  };
  _proto.renderTab = function renderTab(key, icon, label) {
    var _this2 = this;
    var isActive = this.activeTab === key;
    return m("button", {
      className: "Button " + (isActive ? 'Button--primary' : ''),
      onclick: function onclick() {
        _this2.activeTab = key;
        var currentRoute = m.route.get().split('?')[0];
        m.route.set(currentRoute, {
          tab: key
        }, {
          replace: true
        });
      }
    }, m("i", {
      className: icon
    }), " ", m("span", null, label));
  };
  _proto.renderTabContent = function renderTabContent() {
    switch (this.activeTab) {
      case 'events':
        return m(_EventsTab__WEBPACK_IMPORTED_MODULE_9__["default"], null);
      case 'teams':
        return m(_TeamsTab__WEBPACK_IMPORTED_MODULE_6__["default"], null);
      case 'seasons':
        return m(_SeasonsTab__WEBPACK_IMPORTED_MODULE_7__["default"], null);
      case 'weeks':
        return m(_WeeksTab__WEBPACK_IMPORTED_MODULE_8__["default"], null);
      case 'settings':
        return m(_SettingsTab__WEBPACK_IMPORTED_MODULE_10__["default"], null);
      default:
        return m(_EventsTab__WEBPACK_IMPORTED_MODULE_9__["default"], null);
    }
  };
  return PickemPage;
}((flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/admin/components/SeasonsTab.tsx":
/*!*********************************************!*\
  !*** ./src/admin/components/SeasonsTab.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SeasonsTab)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modals_SeasonModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modals/SeasonModal */ "./src/admin/components/modals/SeasonModal.tsx");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4__);





var SeasonsTab = /*#__PURE__*/function (_Component) {
  function SeasonsTab() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SeasonsTab, _Component);
  var _proto = SeasonsTab.prototype;
  _proto.view = function view() {
    var _this = this;
    var seasons = app.store.all('pickem-seasons');
    // GÜNCELLENDİ: lib.models -> lib.common
    var resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.season');
    return m("div", {
      className: "SeasonsTab"
    }, m("div", {
      className: "SeasonsTab-header"
    }, m("h3", null, m("i", {
      className: "fas fa-calendar-alt"
    }), app.translator.trans('huseyinfiliz-pickem.lib.nav.seasons')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button Button--primary",
      icon: "fas fa-plus",
      onclick: function onclick() {
        return app.modal.show(_modals_SeasonModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
          season: null,
          onsave: function onsave() {
            return m.redraw();
          }
        });
      }
    }, app.translator.trans('huseyinfiliz-pickem.lib.actions.create', {
      resource: resourceName
    }))), m("table", {
      className: "Table"
    }, m("thead", null, m("tr", null, m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.name')), m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.slug')), m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.common.date')), m("th", null))), m("tbody", null, seasons.map(function (season) {
      return m("tr", {
        key: season.id()
      }, m("td", null, season.name()), m("td", null, season.slug()), m("td", null, season.startDate() && season.endDate() ? new Date(season.startDate()).toLocaleDateString() + " - " + new Date(season.endDate()).toLocaleDateString() : '-'), m("td", null, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
        className: "Button Button--primary",
        icon: "fas fa-edit",
        onclick: function onclick() {
          return app.modal.show(_modals_SeasonModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
            season: season,
            onsave: function onsave() {
              return m.redraw();
            }
          });
        }
      }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.edit')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
        className: "Button Button--danger",
        icon: "fas fa-trash",
        onclick: function onclick() {
          return _this.deleteSeason(season);
        }
      }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.delete'))));
    }))));
  };
  _proto.deleteSeason = function deleteSeason(season) {
    // GÜNCELLENDİ: lib.models -> lib.common
    var resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.season');
    var confirmMessage = flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4___default()(app.translator.trans('huseyinfiliz-pickem.lib.messages.delete_confirm', {
      resource: resourceName
    }));
    if (!confirm(confirmMessage)) {
      return;
    }
    season["delete"]().then(function () {
      m.redraw();
    });
  };
  return SeasonsTab;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/SettingsTab.tsx":
/*!**********************************************!*\
  !*** ./src/admin/components/SettingsTab.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingsTab)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);



var SettingsTab = /*#__PURE__*/function (_Component) {
  function SettingsTab() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.loading = false;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SettingsTab, _Component);
  var _proto = SettingsTab.prototype;
  _proto.view = function view() {
    return m("div", {
      className: "SettingsTab"
    }, m("div", {
      className: "Form-group"
    }, m("h3", null, m("i", {
      className: "fas fa-cogs"
    }), app.translator.trans('huseyinfiliz-pickem.lib.nav.settings')), m("p", null, app.translator.trans('huseyinfiliz-pickem.admin.settings.recalc_help')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button Button--primary",
      icon: "fas fa-sync",
      loading: this.loading,
      onclick: this.recalculateScores.bind(this)
    }, app.translator.trans('huseyinfiliz-pickem.admin.settings.recalc_btn'))));
  };
  _proto.recalculateScores = function recalculateScores() {
    var _this2 = this;
    if (this.loading) return;
    if (!confirm(app.translator.trans('huseyinfiliz-pickem.admin.settings.recalc_confirm'))) {
      return;
    }
    this.loading = true;
    m.redraw();
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/pickem/recalculate-all-scores'
    }).then(function (response) {
      _this2.loading = false;
      m.redraw();
      app.alerts.show({
        type: 'success'
      }, app.translator.trans('huseyinfiliz-pickem.admin.settings.recalc_queued'));
    })["catch"](function (error) {
      _this2.loading = false;
      m.redraw();
      console.error(error);
    });
  };
  return SettingsTab;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/TeamsTab.tsx":
/*!*******************************************!*\
  !*** ./src/admin/components/TeamsTab.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TeamsTab)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modals_TeamModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modals/TeamModal */ "./src/admin/components/modals/TeamModal.tsx");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4__);





var TeamsTab = /*#__PURE__*/function (_Component) {
  function TeamsTab() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(TeamsTab, _Component);
  var _proto = TeamsTab.prototype;
  _proto.view = function view() {
    var _this = this;
    var teams = app.store.all('pickem-teams');
    // GÜNCELLENDİ: lib.models -> lib.common
    var resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.team');
    return m("div", {
      className: "TeamsTab"
    }, m("div", {
      className: "TeamsTab-header"
    }, m("h3", null, m("i", {
      className: "fas fa-users"
    }), app.translator.trans('huseyinfiliz-pickem.lib.nav.teams')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button Button--primary",
      icon: "fas fa-plus",
      onclick: function onclick() {
        return app.modal.show(_modals_TeamModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
          team: null,
          onsave: function onsave() {
            return m.redraw();
          }
        });
      }
    }, app.translator.trans('huseyinfiliz-pickem.lib.actions.create', {
      resource: resourceName
    }))), m("table", {
      className: "Table"
    }, m("thead", null, m("tr", null, m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.logo')), m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.name')), m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.slug')), m("th", null))), m("tbody", null, teams.map(function (team) {
      return m("tr", {
        key: team.id()
      }, m("td", null, _this.renderTeamLogo(team)), m("td", null, team.name()), m("td", null, team.slug()), m("td", null, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
        className: "Button Button--primary",
        icon: "fas fa-edit",
        onclick: function onclick() {
          return app.modal.show(_modals_TeamModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
            team: team,
            onsave: function onsave() {
              return m.redraw();
            }
          });
        }
      }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.edit')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
        className: "Button Button--danger",
        icon: "fas fa-trash",
        onclick: function onclick() {
          return _this.deleteTeam(team);
        }
      }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.delete'))));
    }))));
  };
  _proto.renderTeamLogo = function renderTeamLogo(team) {
    var logoUrl = team.logoUrl();
    var teamName = team.name();
    var firstLetter = teamName ? teamName.charAt(0).toUpperCase() : 'T';
    var stringToColor = function stringToColor(str) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var hue = hash % 360;
      return "hsl(" + hue + ", 65%, 50%)";
    };
    var backgroundColor = stringToColor(teamName || 'Team');
    if (logoUrl) {
      return m("img", {
        src: logoUrl,
        alt: teamName,
        className: "TeamLogo TeamLogo--image"
      });
    }
    return m("div", {
      className: "TeamLogo TeamLogo--letter",
      style: "background-color: " + backgroundColor
    }, firstLetter);
  };
  _proto.deleteTeam = function deleteTeam(team) {
    // GÜNCELLENDİ: lib.models -> lib.common
    var resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.team');
    var confirmMessage = flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4___default()(app.translator.trans('huseyinfiliz-pickem.lib.messages.delete_confirm', {
      resource: resourceName
    }));
    if (!confirm(confirmMessage)) {
      return;
    }
    team["delete"]().then(function () {
      m.redraw();
    });
  };
  return TeamsTab;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/WeeksTab.tsx":
/*!*******************************************!*\
  !*** ./src/admin/components/WeeksTab.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WeeksTab)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modals_WeekModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modals/WeekModal */ "./src/admin/components/modals/WeekModal.tsx");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4__);





var WeeksTab = /*#__PURE__*/function (_Component) {
  function WeeksTab() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(WeeksTab, _Component);
  var _proto = WeeksTab.prototype;
  _proto.view = function view() {
    var _this = this;
    var weeks = app.store.all('pickem-weeks');
    // GÜNCELLENDİ: lib.models -> lib.common
    var resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.week');
    return m("div", {
      className: "WeeksTab"
    }, m("div", {
      className: "WeeksTab-header"
    }, m("h3", null, m("i", {
      className: "fas fa-calendar-week"
    }), app.translator.trans('huseyinfiliz-pickem.lib.nav.weeks')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button Button--primary",
      icon: "fas fa-plus",
      onclick: function onclick() {
        return app.modal.show(_modals_WeekModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
          week: null,
          onsave: function onsave() {
            return m.redraw();
          }
        });
      }
    }, app.translator.trans('huseyinfiliz-pickem.lib.actions.create', {
      resource: resourceName
    }))), m("table", {
      className: "Table"
    }, m("thead", null, m("tr", null, m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.name')), m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.common.season')), m("th", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.week_number')), m("th", null))), m("tbody", null, weeks.map(function (week) {
      var season = week.season();
      return m("tr", {
        key: week.id()
      }, m("td", null, week.name()), m("td", null, season ? season.name() : 'None'), m("td", null, week.weekNumber() || '-'), m("td", null, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
        className: "Button Button--primary",
        icon: "fas fa-edit",
        onclick: function onclick() {
          return app.modal.show(_modals_WeekModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
            week: week,
            onsave: function onsave() {
              return m.redraw();
            }
          });
        }
      }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.edit')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
        className: "Button Button--danger",
        icon: "fas fa-trash",
        onclick: function onclick() {
          return _this.deleteWeek(week);
        }
      }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.delete'))));
    }))));
  };
  _proto.deleteWeek = function deleteWeek(week) {
    // GÜNCELLENDİ: lib.models -> lib.common
    var resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.week');
    var confirmMessage = flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_4___default()(app.translator.trans('huseyinfiliz-pickem.lib.messages.delete_confirm', {
      resource: resourceName
    }));
    if (!confirm(confirmMessage)) {
      return;
    }
    week["delete"]().then(function () {
      m.redraw();
    });
  };
  return WeeksTab;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/modals/EventModal.tsx":
/*!****************************************************!*\
  !*** ./src/admin/components/modals/EventModal.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5__);






var EventModal = /*#__PURE__*/function (_Modal) {
  function EventModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.event = void 0;
    _this.homeTeamId = '0';
    _this.awayTeamId = '0';
    _this.weekId = '0';
    _this.matchDate = '';
    _this.cutoffDate = '';
    _this.allowDraw = false;
    _this.status = 'scheduled';
    _this.loading = false;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(EventModal, _Modal);
  var _proto = EventModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.event = this.attrs.event;
    if (this.event) {
      this.homeTeamId = this.event.homeTeamId() || '0';
      this.awayTeamId = this.event.awayTeamId() || '0';
      this.weekId = this.event.weekId() || '0';
      this.matchDate = this.formatDateForInput(this.event.matchDate());
      this.cutoffDate = this.formatDateForInput(this.event.cutoffDate());
      this.allowDraw = this.event.allowDraw() || false;
      this.status = this.event.status() || 'scheduled';
    }
  };
  _proto.formatDateForInput = function formatDateForInput(date) {
    if (!date) return '';
    var YYYY = date.getFullYear();
    var MM = (date.getMonth() + 1).toString().padStart(2, '0');
    var DD = date.getDate().toString().padStart(2, '0');
    var HH = date.getHours().toString().padStart(2, '0');
    var mm = date.getMinutes().toString().padStart(2, '0');
    return YYYY + "-" + MM + "-" + DD + "T" + HH + ":" + mm;
  };
  _proto.className = function className() {
    return 'EventModal Modal--medium';
  };
  _proto.title = function title() {
    // GÜNCELLENDİ: lib.models -> lib.common
    var resource = app.translator.trans('huseyinfiliz-pickem.lib.common.match');
    return this.event ? app.translator.trans('huseyinfiliz-pickem.lib.actions.edit', {
      resource: resource
    }) : app.translator.trans('huseyinfiliz-pickem.lib.actions.create', {
      resource: resource
    });
  };
  _proto.content = function content() {
    var _this2 = this;
    var teams = app.store.all('pickem-teams');
    var weeks = app.store.all('pickem-weeks');
    var teamOptions = teams.reduce(function (acc, team) {
      acc[team.id()] = team.name();
      return acc;
    }, {});
    var weekOptions = weeks.reduce(function (acc, week) {
      acc[week.id()] = week.name();
      return acc;
    }, {});
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.common.week')), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "FormControl",
      value: this.weekId,
      onchange: function onchange(value) {
        _this2.weekId = value;
      },
      options: weekOptions,
      "default": "0"
    }, m("option", {
      value: "0"
    }, app.translator.trans('huseyinfiliz-pickem.lib.form.no_week')))), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.home_team')), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "FormControl",
      value: this.homeTeamId,
      onchange: function onchange(value) {
        _this2.homeTeamId = value;
      },
      options: teamOptions,
      "default": "0"
    }, m("option", {
      value: "0"
    }, app.translator.trans('huseyinfiliz-pickem.lib.form.select_team')))), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.away_team')), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "FormControl",
      value: this.awayTeamId,
      onchange: function onchange(value) {
        _this2.awayTeamId = value;
      },
      options: teamOptions,
      "default": "0"
    }, m("option", {
      value: "0"
    }, app.translator.trans('huseyinfiliz-pickem.lib.form.select_team')))), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.match_date')), m("input", {
      className: "FormControl",
      type: "datetime-local",
      value: this.matchDate,
      oninput: function oninput(e) {
        _this2.matchDate = e.target.value;
      },
      required: true
    })), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.cutoff_date')), m("input", {
      className: "FormControl",
      type: "datetime-local",
      value: this.cutoffDate,
      oninput: function oninput(e) {
        _this2.cutoffDate = e.target.value;
      },
      required: true
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      className: "checkbox"
    }, m("input", {
      type: "checkbox",
      checked: this.allowDraw,
      onchange: function onchange(e) {
        _this2.allowDraw = e.target.checked;
      }
    }), app.translator.trans('huseyinfiliz-pickem.lib.form.allow_draw'))), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.common.status')), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "FormControl",
      value: this.status,
      onchange: function onchange(value) {
        _this2.status = value;
      },
      options: {
        scheduled: app.translator.trans('huseyinfiliz-pickem.lib.status.scheduled'),
        closed: app.translator.trans('huseyinfiliz-pickem.lib.status.closed'),
        finished: app.translator.trans('huseyinfiliz-pickem.lib.status.finished')
      }
    })), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      className: "Button Button--primary",
      type: "submit",
      loading: this.loading
    }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.save')))));
  };
  _proto.onsubmit = /*#__PURE__*/function () {
    var _onsubmit = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(e) {
      var data, promise, _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();

            // VALIDASYON (Generic 'invalid_outcome' mesajını kullanıyoruz)
            if (!(!this.matchDate || this.matchDate.trim() === '')) {
              _context.next = 1;
              break;
            }
            app.alerts.show({
              type: 'error'
            }, app.translator.trans('huseyinfiliz-pickem.lib.messages.invalid_outcome'));
            return _context.abrupt("return");
          case 1:
            if (!(!this.cutoffDate || this.cutoffDate.trim() === '')) {
              _context.next = 2;
              break;
            }
            app.alerts.show({
              type: 'error'
            }, app.translator.trans('huseyinfiliz-pickem.lib.messages.invalid_outcome'));
            return _context.abrupt("return");
          case 2:
            if (!(this.homeTeamId === '0' || this.homeTeamId === '' || !this.homeTeamId)) {
              _context.next = 3;
              break;
            }
            app.alerts.show({
              type: 'error'
            }, app.translator.trans('huseyinfiliz-pickem.lib.messages.invalid_outcome'));
            return _context.abrupt("return");
          case 3:
            if (!(this.awayTeamId === '0' || this.awayTeamId === '' || !this.awayTeamId)) {
              _context.next = 4;
              break;
            }
            app.alerts.show({
              type: 'error'
            }, app.translator.trans('huseyinfiliz-pickem.lib.messages.invalid_outcome'));
            return _context.abrupt("return");
          case 4:
            if (!(this.homeTeamId === this.awayTeamId)) {
              _context.next = 5;
              break;
            }
            app.alerts.show({
              type: 'error'
            }, app.translator.trans('huseyinfiliz-pickem.lib.messages.same_team'));
            return _context.abrupt("return");
          case 5:
            this.loading = true;
            m.redraw();
            data = {
              weekId: this.weekId === '0' ? null : parseInt(this.weekId),
              homeTeamId: parseInt(this.homeTeamId),
              awayTeamId: parseInt(this.awayTeamId),
              matchDate: this.matchDate,
              cutoffDate: this.cutoffDate,
              allowDraw: this.allowDraw,
              status: this.status
            };
            _context.prev = 6;
            promise = this.event ? this.event.save(data) : app.store.createRecord('pickem-events').save(data);
            _context.next = 7;
            return promise;
          case 7:
            this.attrs.onsave();
            this.hide();
            _context.next = 9;
            break;
          case 8:
            _context.prev = 8;
            _t = _context["catch"](6);
            this.loading = false;
            this.alertAttrs = _t.alert;
            m.redraw();
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[6, 8]]);
    }));
    function onsubmit(_x) {
      return _onsubmit.apply(this, arguments);
    }
    return onsubmit;
  }();
  return EventModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/admin/components/modals/ResultModal.tsx":
/*!*****************************************************!*\
  !*** ./src/admin/components/modals/ResultModal.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResultModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);





var ResultModal = /*#__PURE__*/function (_Modal) {
  function ResultModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.event = void 0;
    _this.homeScore = '';
    _this.awayScore = '';
    _this.loading = false;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(ResultModal, _Modal);
  var _proto = ResultModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.event = this.attrs.event;
    this.homeScore = this.event.homeScore() !== null ? this.event.homeScore() : '';
    this.awayScore = this.event.awayScore() !== null ? this.event.awayScore() : '';
  };
  _proto.className = function className() {
    return 'ResultModal Modal--small';
  };
  _proto.title = function title() {
    return app.translator.trans('huseyinfiliz-pickem.lib.actions.enter_result');
  };
  _proto.content = function content() {
    var _this2 = this;
    var homeTeam = this.event.homeTeam();
    var awayTeam = this.event.awayTeam();
    var resultText = '';
    var home = Number(this.homeScore);
    var away = Number(this.awayScore);
    if (this.homeScore !== '' && this.awayScore !== '') {
      if (home > away) resultText = homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.home');else if (away > home) resultText = awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.away');
      // GÜNCELLENDİ: forum.picks.draw -> lib.common.draw
      else resultText = app.translator.trans('huseyinfiliz-pickem.lib.common.draw');
    }
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.form.home_team')), m("input", {
      className: "FormControl",
      type: "number",
      min: "0",
      value: this.homeScore,
      oninput: function oninput(e) {
        _this2.homeScore = e.target.value;
      }
    })), m("div", {
      className: "Form-group"
    }, m("label", null, awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.form.away_team')), m("input", {
      className: "FormControl",
      type: "number",
      min: "0",
      value: this.awayScore,
      oninput: function oninput(e) {
        _this2.awayScore = e.target.value;
      }
    })), resultText && m("div", {
      className: "Form-group"
    }, m("p", null, m("strong", null, app.translator.trans('huseyinfiliz-pickem.lib.common.result'), ": "), resultText)), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      className: "Button Button--primary",
      type: "submit",
      loading: this.loading
    }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.save')))));
  };
  _proto.onsubmit = /*#__PURE__*/function () {
    var _onsubmit = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(e) {
      var response, _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            this.loading = true;
            m.redraw();
            _context.prev = 1;
            _context.next = 2;
            return app.request({
              method: 'POST',
              url: app.forum.attribute('apiUrl') + "/pickem-events/" + this.event.id() + "/result",
              body: {
                data: {
                  type: 'pickem-events',
                  attributes: {
                    homeScore: parseInt(this.homeScore) || 0,
                    awayScore: parseInt(this.awayScore) || 0
                  }
                }
              }
            });
          case 2:
            response = _context.sent;
            app.store.pushPayload(response);
            app.alerts.show({
              type: 'success'
            }, app.translator.trans('huseyinfiliz-pickem.lib.messages.result_saved'));
            this.attrs.onsave();
            this.hide();
            _context.next = 4;
            break;
          case 3:
            _context.prev = 3;
            _t = _context["catch"](1);
            this.loading = false;
            this.alertAttrs = _t.alert;
            m.redraw();
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[1, 3]]);
    }));
    function onsubmit(_x) {
      return _onsubmit.apply(this, arguments);
    }
    return onsubmit;
  }();
  return ResultModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/admin/components/modals/SeasonModal.tsx":
/*!*****************************************************!*\
  !*** ./src/admin/components/modals/SeasonModal.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SeasonModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/utils/string */ "flarum/common/utils/string");
/* harmony import */ var flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_5__);






var SeasonModal = /*#__PURE__*/function (_Modal) {
  function SeasonModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.season = void 0;
    _this.name = '';
    _this.slug = '';
    _this.startDate = '';
    _this.endDate = '';
    _this.loading = false;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(SeasonModal, _Modal);
  var _proto = SeasonModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.season = this.attrs.season;
    if (this.season) {
      this.name = this.season.name() || '';
      this.slug = this.season.slug() || '';
      this.startDate = this.formatDateForInput(this.season.startDate());
      this.endDate = this.formatDateForInput(this.season.endDate());
    }
  };
  _proto.formatDateForInput = function formatDateForInput(dateString) {
    if (!dateString) return '';
    var date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };
  _proto.className = function className() {
    return 'SeasonModal Modal--small';
  };
  _proto.title = function title() {
    // GÜNCELLENDİ: lib.models -> lib.common
    var resource = app.translator.trans('huseyinfiliz-pickem.lib.common.season');
    return this.season ? app.translator.trans('huseyinfiliz-pickem.lib.actions.edit', {
      resource: resource
    }) : app.translator.trans('huseyinfiliz-pickem.lib.actions.create', {
      resource: resource
    });
  };
  _proto.content = function content() {
    var _this2 = this;
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.name')), m("input", {
      className: "FormControl",
      type: "text",
      value: this.name,
      oninput: function oninput(e) {
        _this2.name = e.target.value;
        if (!_this2.season) {
          _this2.slug = (0,flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_5__.slug)(_this2.name);
        }
      }
    })), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.slug')), m("input", {
      className: "FormControl",
      type: "text",
      value: this.slug,
      oninput: function oninput(e) {
        _this2.slug = e.target.value;
      }
    })), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.start_date')), m("input", {
      className: "FormControl",
      type: "date",
      value: this.startDate,
      oninput: function oninput(e) {
        _this2.startDate = e.target.value;
      }
    })), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.end_date')), m("input", {
      className: "FormControl",
      type: "date",
      value: this.endDate,
      oninput: function oninput(e) {
        _this2.endDate = e.target.value;
      }
    })), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      className: "Button Button--primary",
      type: "submit",
      loading: this.loading
    }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.save')))));
  };
  _proto.onsubmit = /*#__PURE__*/function () {
    var _onsubmit = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(e) {
      var data, promise, _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            this.loading = true;
            m.redraw();
            data = {
              name: this.name,
              slug: this.slug,
              startDate: this.startDate || null,
              endDate: this.endDate || null
            };
            _context.prev = 1;
            promise = this.season ? this.season.save(data) : app.store.createRecord('pickem-seasons').save(data);
            _context.next = 2;
            return promise;
          case 2:
            this.attrs.onsave();
            this.hide();
            _context.next = 4;
            break;
          case 3:
            _context.prev = 3;
            _t = _context["catch"](1);
            this.loading = false;
            this.alertAttrs = _t.alert;
            m.redraw();
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[1, 3]]);
    }));
    function onsubmit(_x) {
      return _onsubmit.apply(this, arguments);
    }
    return onsubmit;
  }();
  return SeasonModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/admin/components/modals/TeamModal.tsx":
/*!***************************************************!*\
  !*** ./src/admin/components/modals/TeamModal.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TeamModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/utils/string */ "flarum/common/utils/string");
/* harmony import */ var flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_5__);






var TeamModal = /*#__PURE__*/function (_Modal) {
  function TeamModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.team = void 0;
    _this.name = '';
    _this.slug = '';
    _this.logoPath = '';
    _this.loading = false;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(TeamModal, _Modal);
  var _proto = TeamModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.team = this.attrs.team;
    if (this.team) {
      this.name = this.team.name() || '';
      this.slug = this.team.slug() || '';
      this.logoPath = this.team.logoPath() || '';
    }
  };
  _proto.className = function className() {
    return 'TeamModal Modal--small';
  };
  _proto.title = function title() {
    // GÜNCELLENDİ: lib.models -> lib.common
    var resource = app.translator.trans('huseyinfiliz-pickem.lib.common.team');
    return this.team ? app.translator.trans('huseyinfiliz-pickem.lib.actions.edit', {
      resource: resource
    }) : app.translator.trans('huseyinfiliz-pickem.lib.actions.create', {
      resource: resource
    });
  };
  _proto.content = function content() {
    var _this2 = this;
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.name')), m("input", {
      className: "FormControl",
      type: "text",
      value: this.name,
      oninput: function oninput(e) {
        _this2.name = e.target.value;
        if (!_this2.team) {
          _this2.slug = (0,flarum_common_utils_string__WEBPACK_IMPORTED_MODULE_5__.slug)(_this2.name);
        }
      }
    })), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.slug')), m("input", {
      className: "FormControl",
      type: "text",
      value: this.slug,
      oninput: function oninput(e) {
        _this2.slug = e.target.value;
      }
    })), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.logo_url')), m("input", {
      className: "FormControl",
      type: "text",
      value: this.logoPath,
      oninput: function oninput(e) {
        _this2.logoPath = e.target.value;
      },
      placeholder: "https://example.com/logo.png"
    }), this.logoPath && m("div", {
      style: {
        marginTop: '10px'
      }
    }, m("img", {
      src: this.logoPath,
      alt: "Logo preview",
      style: {
        maxWidth: '100px',
        maxHeight: '100px',
        border: '1px solid #ddd',
        padding: '5px',
        borderRadius: '4px'
      },
      onerror: function onerror(e) {
        e.target.style.display = 'none';
      }
    }))), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      className: "Button Button--primary",
      type: "submit",
      loading: this.loading
    }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.save')))));
  };
  _proto.onsubmit = /*#__PURE__*/function () {
    var _onsubmit = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(e) {
      var data, promise, _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            this.loading = true;
            m.redraw();
            data = {
              name: this.name,
              slug: this.slug,
              logoPath: this.logoPath
            };
            _context.prev = 1;
            promise = this.team ? this.team.save(data) : app.store.createRecord('pickem-teams').save(data);
            _context.next = 2;
            return promise;
          case 2:
            this.attrs.onsave();
            this.hide();
            _context.next = 4;
            break;
          case 3:
            _context.prev = 3;
            _t = _context["catch"](1);
            this.loading = false;
            this.alertAttrs = _t.alert;
            m.redraw();
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[1, 3]]);
    }));
    function onsubmit(_x) {
      return _onsubmit.apply(this, arguments);
    }
    return onsubmit;
  }();
  return TeamModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/admin/components/modals/WeekModal.tsx":
/*!***************************************************!*\
  !*** ./src/admin/components/modals/WeekModal.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WeekModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5__);






var WeekModal = /*#__PURE__*/function (_Modal) {
  function WeekModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.week = void 0;
    _this.name = '';
    _this.weekNumber = '';
    _this.seasonId = '0';
    _this.loading = false;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(WeekModal, _Modal);
  var _proto = WeekModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.week = this.attrs.week;
    if (this.week) {
      this.name = this.week.name() || '';
      this.weekNumber = this.week.weekNumber() || '';
      this.seasonId = this.week.seasonId() || '0';
    }
  };
  _proto.className = function className() {
    return 'WeekModal Modal--small';
  };
  _proto.title = function title() {
    // GÜNCELLENDİ: lib.models -> lib.common
    var resource = app.translator.trans('huseyinfiliz-pickem.lib.common.week');
    return this.week ? app.translator.trans('huseyinfiliz-pickem.lib.actions.edit', {
      resource: resource
    }) : app.translator.trans('huseyinfiliz-pickem.lib.actions.create', {
      resource: resource
    });
  };
  _proto.content = function content() {
    var _this2 = this;
    var seasons = app.store.all('pickem-seasons');
    var seasonOptions = seasons.reduce(function (options, season) {
      options[season.id()] = season.name();
      return options;
    }, {});
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.name')), m("input", {
      className: "FormControl",
      type: "text",
      value: this.name,
      oninput: function oninput(e) {
        _this2.name = e.target.value;
      }
    })), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.common.season')), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "FormControl",
      value: this.seasonId,
      onchange: function onchange(value) {
        _this2.seasonId = value;
      },
      options: seasonOptions,
      "default": "0"
    }, m("option", {
      value: "0"
    }, app.translator.trans('huseyinfiliz-pickem.lib.form.select_season')))), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('huseyinfiliz-pickem.lib.form.week_number')), m("input", {
      className: "FormControl",
      type: "number",
      value: this.weekNumber,
      oninput: function oninput(e) {
        _this2.weekNumber = e.target.value;
      }
    })), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      className: "Button Button--primary",
      type: "submit",
      loading: this.loading
    }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.save')))));
  };
  _proto.onsubmit = /*#__PURE__*/function () {
    var _onsubmit = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(e) {
      var data, promise, _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            this.loading = true;
            m.redraw();
            data = {
              name: this.name,
              weekNumber: this.weekNumber || null,
              seasonId: this.seasonId === '0' ? null : this.seasonId
            };
            _context.prev = 1;
            promise = this.week ? this.week.save(data) : app.store.createRecord('pickem-weeks').save(data);
            _context.next = 2;
            return promise;
          case 2:
            this.attrs.onsave();
            this.hide();
            _context.next = 4;
            break;
          case 3:
            _context.prev = 3;
            _t = _context["catch"](1);
            this.loading = false;
            this.alertAttrs = _t.alert;
            m.redraw();
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[1, 3]]);
    }));
    function onsubmit(_x) {
      return _onsubmit.apply(this, arguments);
    }
    return onsubmit;
  }();
  return WeekModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/admin/extend.ts":
/*!*****************************!*\
  !*** ./src/admin/extend.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/extend */ "./src/common/extend.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_common_extend__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/admin/index.ts":
/*!****************************!*\
  !*** ./src/admin/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extend */ "./src/admin/extend.ts");
/* harmony import */ var _components_PickemPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/PickemPage */ "./src/admin/components/PickemPage.tsx");



flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('huseyinfiliz/pickem', function () {
  _extend__WEBPACK_IMPORTED_MODULE_1__["default"].forEach(function (extender) {
    return extender.extend((flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default()));
  });
  flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('huseyinfiliz-pickem').registerPage(_components_PickemPage__WEBPACK_IMPORTED_MODULE_2__["default"]).registerPermission({
    icon: 'fas fa-trophy',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('huseyinfiliz-pickem.admin.permissions.manage'),
    permission: 'pickem.manage'
  }, 'moderate').registerPermission({
    icon: 'fas fa-check-circle',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('huseyinfiliz-pickem.admin.permissions.make_picks'),
    permission: 'pickem.makePicks'
  }, 'start').registerPermission({
    icon: 'fas fa-eye',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('huseyinfiliz-pickem.admin.permissions.view_page'),
    permission: 'pickem.view',
    allowGuest: true
  }, 'view');
});

/***/ }),

/***/ "./src/common/extend.ts":
/*!******************************!*\
  !*** ./src/common/extend.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_Team__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/Team */ "./src/common/models/Team.ts");
/* harmony import */ var _models_Season__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/Season */ "./src/common/models/Season.ts");
/* harmony import */ var _models_Week__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/Week */ "./src/common/models/Week.ts");
/* harmony import */ var _models_Event__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/Event */ "./src/common/models/Event.ts");
/* harmony import */ var _models_Pick__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models/Pick */ "./src/common/models/Pick.ts");
/* harmony import */ var _models_UserScore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./models/UserScore */ "./src/common/models/UserScore.ts");








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('pickem-teams', _models_Team__WEBPACK_IMPORTED_MODULE_2__["default"]), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Model)(_models_Team__WEBPACK_IMPORTED_MODULE_2__["default"]).attribute('name').attribute('slug').attribute('logoPath').attribute('logoUrl'), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('pickem-seasons', _models_Season__WEBPACK_IMPORTED_MODULE_3__["default"]), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Model)(_models_Season__WEBPACK_IMPORTED_MODULE_3__["default"]).attribute('name').attribute('slug').attribute('startDate', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate)) // Tip ataması
.attribute('endDate', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate)),
// Tip ataması

new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('pickem-weeks', _models_Week__WEBPACK_IMPORTED_MODULE_4__["default"]), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Model)(_models_Week__WEBPACK_IMPORTED_MODULE_4__["default"]).attribute('name').attribute('seasonId').attribute('weekNumber').hasOne('season'), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('pickem-events', _models_Event__WEBPACK_IMPORTED_MODULE_5__["default"]), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Model)(_models_Event__WEBPACK_IMPORTED_MODULE_5__["default"]).attribute('weekId').attribute('homeTeamId').attribute('awayTeamId').attribute('matchDate', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate)) // Tip ataması
.attribute('cutoffDate', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate)) // Tip ataması
.attribute('allowDraw').attribute('status').attribute('homeScore').attribute('awayScore').attribute('result').attribute('canPick').hasOne('week').hasOne('homeTeam').hasOne('awayTeam'), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('pickem-picks', _models_Pick__WEBPACK_IMPORTED_MODULE_6__["default"]), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Model)(_models_Pick__WEBPACK_IMPORTED_MODULE_6__["default"]).attribute('userId').attribute('eventId').attribute('selectedOutcome').attribute('isCorrect').hasOne('event').hasOne('user'), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('pickem-user-scores', _models_UserScore__WEBPACK_IMPORTED_MODULE_7__["default"]), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Model)(_models_UserScore__WEBPACK_IMPORTED_MODULE_7__["default"]).attribute('userId').attribute('seasonId').attribute('totalPoints').attribute('totalPicks').attribute('correctPicks').attribute('accuracy').hasOne('user').hasOne('season')]);

/***/ }),

/***/ "./src/common/models/Event.ts":
/*!************************************!*\
  !*** ./src/common/models/Event.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PickemEvent)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);


var PickemEvent = /*#__PURE__*/function (_Model) {
  function PickemEvent() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.weekId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('weekId');
    _this.homeTeamId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('homeTeamId');
    _this.awayTeamId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('awayTeamId');
    _this.matchDate = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('matchDate', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate));
    _this.cutoffDate = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('cutoffDate', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate));
    _this.allowDraw = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('allowDraw');
    _this.status = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('status');
    _this.homeScore = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('homeScore');
    _this.awayScore = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('awayScore');
    _this.result = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('result');
    _this.canPick = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('canPick');
    _this.week = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().hasOne('week');
    _this.homeTeam = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().hasOne('homeTeam');
    _this.awayTeam = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().hasOne('awayTeam');
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PickemEvent, _Model);
  return PickemEvent;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/common/models/Pick.ts":
/*!***********************************!*\
  !*** ./src/common/models/Pick.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pick)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);


var Pick = /*#__PURE__*/function (_Model) {
  function Pick() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.userId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('userId');
    _this.eventId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('eventId');
    _this.selectedOutcome = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('selectedOutcome');
    _this.isCorrect = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('isCorrect');
    _this.event = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().hasOne('event');
    _this.user = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().hasOne('user');
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Pick, _Model);
  return Pick;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/common/models/Season.ts":
/*!*************************************!*\
  !*** ./src/common/models/Season.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Season)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);


var Season = /*#__PURE__*/function (_Model) {
  function Season() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.name = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('name');
    _this.slug = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('slug');
    _this.startDate = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('startDate', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate));
    _this.endDate = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('endDate', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate));
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Season, _Model);
  return Season;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/common/models/Team.ts":
/*!***********************************!*\
  !*** ./src/common/models/Team.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Team)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);


var Team = /*#__PURE__*/function (_Model) {
  function Team() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.name = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('name');
    _this.slug = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('slug');
    _this.logoPath = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('logoPath');
    _this.logoUrl = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('logoUrl');
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Team, _Model);
  return Team;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/common/models/UserScore.ts":
/*!****************************************!*\
  !*** ./src/common/models/UserScore.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserScore)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);


var UserScore = /*#__PURE__*/function (_Model) {
  function UserScore() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.userId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('userId');
    _this.seasonId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('seasonId');
    _this.totalPoints = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('totalPoints');
    _this.totalPicks = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('totalPicks');
    _this.correctPicks = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('correctPicks');
    _this.accuracy = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('accuracy');
    _this.user = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().hasOne('user');
    _this.season = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().hasOne('season');
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UserScore, _Model);
  return UserScore;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/common/models/Week.ts":
/*!***********************************!*\
  !*** ./src/common/models/Week.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Week)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);


var Week = /*#__PURE__*/function (_Model) {
  function Week() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.name = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('name');
    _this.seasonId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('seasonId');
    _this.weekNumber = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('weekNumber');
    _this.season = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().hasOne('season');
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Week, _Model);
  return Week;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "flarum/admin/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/app'];

/***/ }),

/***/ "flarum/admin/components/ExtensionPage":
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['admin/components/ExtensionPage']" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/components/ExtensionPage'];

/***/ }),

/***/ "flarum/common/Component":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Component'];

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/components/Alert":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Alert']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Alert'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Modal":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Modal']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Modal'];

/***/ }),

/***/ "flarum/common/components/Placeholder":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['common/components/Placeholder']" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Placeholder'];

/***/ }),

/***/ "flarum/common/components/Select":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Select']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Select'];

/***/ }),

/***/ "flarum/common/extenders":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/extenders']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extenders'];

/***/ }),

/***/ "flarum/common/utils/extractText":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/utils/extractText']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/extractText'];

/***/ }),

/***/ "flarum/common/utils/string":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/utils/string']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/string'];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.ts");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map