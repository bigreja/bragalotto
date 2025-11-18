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

/***/ "./src/forum/components/EventCard.tsx":
/*!********************************************!*\
  !*** ./src/forum/components/EventCard.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventCard)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);




// ... (Arayüz tanımları aynı)
var EventCard = /*#__PURE__*/function (_Component) {
  function EventCard() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(EventCard, _Component);
  var _proto = EventCard.prototype;
  _proto.view = function view() {
    var _this$attrs = this.attrs,
      event = _this$attrs.event,
      pick = _this$attrs.pick,
      onMakePick = _this$attrs.onMakePick,
      isLoading = _this$attrs.isLoading;
    if (!event || typeof event.id !== 'function') {
      return null;
    }
    var homeTeam = event.homeTeam ? event.homeTeam() : null;
    var awayTeam = event.awayTeam ? event.awayTeam() : null;
    var canPick = typeof event.canPick === 'function' ? event.canPick() : false;
    var status = typeof event.status === 'function' ? event.status() : 'scheduled';
    var result = typeof event.result === 'function' ? event.result() : null;
    var homeScore = typeof event.homeScore === 'function' ? event.homeScore() : null;
    var awayScore = typeof event.awayScore === 'function' ? event.awayScore() : null;
    var matchDate = '-';
    var cutoffDate = '-';
    try {
      matchDate = dayjs(event.matchDate()).format('DD MMM YYYY, HH:mm');
    } catch (_unused) {
      matchDate = String(event.matchDate());
    }
    try {
      cutoffDate = dayjs(event.cutoffDate()).format('DD MMM YYYY, HH:mm');
    } catch (_unused2) {
      cutoffDate = String(event.cutoffDate());
    }
    var countdown = this.getCountdown(event.cutoffDate());
    return m("div", {
      className: "EventCard"
    }, m("div", {
      className: "EventCard-status " + status
    }, app.translator.trans("huseyinfiliz-pickem.lib.status." + status)), m("div", {
      className: "EventCard-teams"
    }, m("div", {
      className: "team-container"
    }, this.renderTeamLogo(homeTeam), m("div", {
      className: "team-name"
    }, homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.home'))), m("div", {
      className: "vs"
    }, app.translator.trans('huseyinfiliz-pickem.lib.common.vs')), m("div", {
      className: "team-container"
    }, this.renderTeamLogo(awayTeam), m("div", {
      className: "team-name"
    }, awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.away')))), status === 'finished' && homeScore !== null && awayScore !== null && m("div", {
      className: "EventCard-score"
    }, m("div", {
      className: "score-number"
    }, homeScore), m("div", {
      className: "score-separator"
    }, "-"), m("div", {
      className: "score-number"
    }, awayScore)), m("div", {
      className: "EventCard-info"
    }, m("div", null, m("i", {
      className: "fas fa-calendar"
    }), m("strong", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.match_date'), ":"), " ", matchDate), m("div", null, m("i", {
      className: "fas fa-clock"
    }), m("strong", null, app.translator.trans('huseyinfiliz-pickem.lib.headers.cutoff_date'), ":"), " ", cutoffDate), countdown && canPick && m("div", null, m("span", {
      className: "EventCard-countdown " + (countdown.urgent ? 'urgent' : '')
    }, m("i", {
      className: "fas fa-hourglass-half"
    }), countdown.text)), result && m("div", null, m("i", {
      className: "fas fa-flag-checkered"
    }), m("strong", null, app.translator.trans('huseyinfiliz-pickem.lib.common.result'), ":"), " ", this.formatResult(result, homeTeam, awayTeam))), app.session.user && canPick && m("div", {
      className: "EventCard-picks"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button " + (pick && typeof pick.selectedOutcome === 'function' && pick.selectedOutcome() === 'home' ? 'Button--pickem-selected' : ''),
      onclick: function onclick() {
        return onMakePick(Number(event.id()), 'home');
      },
      loading: isLoading,
      disabled: isLoading
    }, homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.home')), event.allowDraw && event.allowDraw() && m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button " + (pick && typeof pick.selectedOutcome === 'function' && pick.selectedOutcome() === 'draw' ? 'Button--pickem-selected' : ''),
      onclick: function onclick() {
        return onMakePick(Number(event.id()), 'draw');
      },
      loading: isLoading,
      disabled: isLoading
    }, app.translator.trans('huseyinfiliz-pickem.lib.common.draw')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button " + (pick && typeof pick.selectedOutcome === 'function' && pick.selectedOutcome() === 'away' ? 'Button--pickem-selected' : ''),
      onclick: function onclick() {
        return onMakePick(Number(event.id()), 'away');
      },
      loading: isLoading,
      disabled: isLoading
    }, awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.away'))), pick && !canPick && m("div", {
      className: "EventCard-pick-result"
    }, app.translator.trans('huseyinfiliz-pickem.forum.picks.your_pick'), ": ", m("strong", null, this.formatResult(pick.selectedOutcome(), homeTeam, awayTeam)), pick.isCorrect && typeof pick.isCorrect === 'function' && pick.isCorrect() !== null && m("span", {
      className: pick.isCorrect() ? 'correct' : 'incorrect'
    }, pick.isCorrect() ? " \u2713 " + app.translator.trans('huseyinfiliz-pickem.lib.status.correct') : " \u2717 " + app.translator.trans('huseyinfiliz-pickem.lib.status.incorrect'))));
  };
  _proto.renderTeamLogo = function renderTeamLogo(team) {
    if (!team) {
      return m("div", {
        className: "team-logo"
      }, m("span", null, "?"));
    }
    var logoUrl = typeof team.logoUrl === 'function' ? team.logoUrl() : null;
    var teamName = typeof team.name === 'function' ? team.name() : app.translator.trans('core.lib.username.deleted_text');
    if (logoUrl) {
      return m("div", {
        className: "team-logo"
      }, m("img", {
        src: logoUrl,
        alt: teamName
      }));
    }
    var initial = teamName.charAt(0).toUpperCase();
    var colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];
    var colorIndex = teamName.charCodeAt(0) % colors.length;
    var bgColor = colors[colorIndex];
    return m("div", {
      className: "team-logo",
      style: "background-color: " + bgColor + ";"
    }, m("span", null, initial));
  };
  _proto.getCountdown = function getCountdown(cutoffDate) {
    try {
      var now = dayjs();
      var cutoff = dayjs(cutoffDate);
      var diff = cutoff.diff(now);
      if (diff <= 0) return null;
      var hours = Math.floor(diff / (1000 * 60 * 60));
      var minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
      if (hours < 1) {
        return {
          text: app.translator.trans('huseyinfiliz-pickem.lib.time.minutes_remaining', {
            minutes: minutes
          }),
          urgent: minutes < 30
        };
      }
      if (hours < 24) {
        return {
          text: app.translator.trans('huseyinfiliz-pickem.lib.time.hours_remaining', {
            hours: hours,
            minutes: minutes
          }),
          urgent: hours < 2
        };
      }
      var days = Math.floor(hours / 24);
      return {
        text: app.translator.trans('huseyinfiliz-pickem.lib.time.days_remaining', {
          days: days
        }),
        urgent: false
      };
    } catch (_unused3) {
      return null;
    }
  };
  _proto.formatResult = function formatResult(result, homeTeam, awayTeam) {
    // GÜNCELLENDİ: forum.picks.* -> lib.common.*
    if (result === 'home') return homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.home');
    if (result === 'away') return awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.away');
    if (result === 'draw') return app.translator.trans('huseyinfiliz-pickem.lib.common.draw');
    return result;
  };
  return EventCard;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/EventResultNotification.tsx":
/*!**********************************************************!*\
  !*** ./src/forum/components/EventResultNotification.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventResultNotification)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/Notification */ "flarum/forum/components/Notification");
/* harmony import */ var flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_1__);


var EventResultNotification = /*#__PURE__*/function (_Notification) {
  function EventResultNotification() {
    return _Notification.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(EventResultNotification, _Notification);
  var _proto = EventResultNotification.prototype;
  _proto.icon = function icon() {
    return 'fas fa-trophy';
  };
  _proto.href = function href() {
    return app.route('pickem');
  };
  _proto.content = function content() {
    var notification = this.attrs.notification;
    var data = notification.subject();
    if (!data) {
      return app.translator.trans('huseyinfiliz-pickem.forum.notification');
    }

    // GÜNCELLENDİ: Hardcoded stringler yerine çeviri anahtarları ve güvenli erişim
    // data.homeTeam() bir model döndürür, yoksa çeviriyi kullan.
    var homeTeam = data.homeTeam && data.homeTeam() ? data.homeTeam().name() : app.translator.trans('huseyinfiliz-pickem.lib.common.home');
    var awayTeam = data.awayTeam && data.awayTeam() ? data.awayTeam().name() : app.translator.trans('huseyinfiliz-pickem.lib.common.away');
    var homeScore = data.homeScore !== undefined ? data.homeScore() : 0;
    var awayScore = data.awayScore !== undefined ? data.awayScore() : 0;
    return app.translator.trans('huseyinfiliz-pickem.forum.notification', {
      home: homeTeam,
      hScore: homeScore,
      aScore: awayScore,
      away: awayTeam
    });
  };
  _proto.excerpt = function excerpt() {
    return null;
  };
  return EventResultNotification;
}((flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/LeaderboardTab.tsx":
/*!*************************************************!*\
  !*** ./src/forum/components/LeaderboardTab.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LeaderboardTab)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);


var LeaderboardTab = /*#__PURE__*/function (_Component) {
  function LeaderboardTab() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(LeaderboardTab, _Component);
  var _proto = LeaderboardTab.prototype;
  _proto.view = function view() {
    var userScores = this.attrs.userScores;
    if (!userScores || userScores.length === 0) {
      return m("div", {
        className: "LeaderboardTab"
      }, m("p", null, app.translator.trans('huseyinfiliz-pickem.lib.messages.no_data')));
    }
    return m("div", {
      className: "LeaderboardTab"
    }, m("div", {
      className: "Leaderboard"
    }, userScores.length >= 3 && this.renderPodium(userScores.slice(0, 3)), this.renderList(userScores)));
  };
  _proto.renderPodium = function renderPodium(topThree) {
    var medals = ['🥇', '🥈', '🥉'];
    var positions = ['first', 'second', 'third'];
    return m("div", {
      className: "Podium"
    }, topThree.map(function (score, index) {
      var user = score && (typeof score.user === 'function' ? score.user() : score.user);
      var totalPoints = typeof score.totalPoints === 'function' ? score.totalPoints() : score.totalPoints;
      var correctPicks = typeof score.correctPicks === 'function' ? score.correctPicks() : score.correctPicks;
      return m("div", {
        className: "Podium-card " + positions[index],
        key: index
      }, m("div", {
        className: "medal"
      }, medals[index]), m("div", {
        className: "rank"
      }, "#", index + 1), m("div", {
        className: "username"
      }, user ? typeof user.displayName === 'function' ? user.displayName() : user.displayName : app.translator.trans('core.lib.username.deleted_text')), m("div", {
        className: "points"
      }, totalPoints, m("small", null, app.translator.trans('huseyinfiliz-pickem.lib.common.points'))), m("div", {
        className: "stats"
      }, m("div", {
        className: "stat"
      }, m("div", {
        className: "label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.headers.correct')), m("div", {
        className: "value"
      }, correctPicks)), m("div", {
        className: "stat"
      }, m("div", {
        className: "label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.headers.accuracy')), m("div", {
        className: "value"
      }, score.accuracy(), "%"))));
    }));
  }

  /**
   * YENİ: renderTable yerine Flarum standartlarına uygun responsive liste metodu
   */;
  _proto.renderList = function renderList(userScores) {
    return m("div", {
      className: "PickemList"
    }, m("div", {
      className: "PickemList-header"
    }, m("div", {
      className: "PickemList-cell type-rank"
    }, app.translator.trans('huseyinfiliz-pickem.lib.headers.rank')), m("div", {
      className: "PickemList-cell type-player"
    }, app.translator.trans('huseyinfiliz-pickem.lib.headers.player')), m("div", {
      className: "PickemList-cell type-stat"
    }, app.translator.trans('huseyinfiliz-pickem.lib.common.points')), m("div", {
      className: "PickemList-cell type-stat"
    }, app.translator.trans('huseyinfiliz-pickem.lib.headers.correct')), m("div", {
      className: "PickemList-cell type-stat"
    }, app.translator.trans('huseyinfiliz-pickem.lib.headers.total')), m("div", {
      className: "PickemList-cell type-stat"
    }, app.translator.trans('huseyinfiliz-pickem.lib.headers.accuracy'))), m("div", {
      className: "PickemList-body"
    }, userScores.map(function (score, index) {
      var user = score && (typeof score.user === 'function' ? score.user() : score.user);
      var scoreId = score && (typeof score.id === 'function' ? score.id() : score.id) || index;
      var totalPoints = typeof score.totalPoints === 'function' ? score.totalPoints() : score.totalPoints;
      var correctPicks = typeof score.correctPicks === 'function' ? score.correctPicks() : score.correctPicks;
      var totalPicks = typeof score.totalPicks === 'function' ? score.totalPicks() : score.totalPicks;
      var accuracy = typeof score.accuracy === 'function' ? score.accuracy() : 0;
      return m("div", {
        key: String(scoreId),
        className: "PickemList-item " + (index < 3 ? "top-" + (index + 1) : '')
      }, m("div", {
        className: "PickemList-cell type-rank"
      }, m("span", {
        className: "mobile-label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.headers.rank')), m("span", {
        className: "value"
      }, "#", index + 1)), m("div", {
        className: "PickemList-cell type-player"
      }, m("span", {
        className: "value"
      }, user ? typeof user.displayName === 'function' ? user.displayName() : user.displayName : app.translator.trans('core.lib.username.deleted_text'))), m("div", {
        className: "PickemList-cell type-stat"
      }, m("span", {
        className: "mobile-label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.common.points')), m("span", {
        className: "value"
      }, m("strong", null, totalPoints))), m("div", {
        className: "PickemList-cell type-stat"
      }, m("span", {
        className: "mobile-label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.headers.correct')), m("span", {
        className: "value"
      }, correctPicks)), m("div", {
        className: "PickemList-cell type-stat"
      }, m("span", {
        className: "mobile-label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.headers.total')), m("span", {
        className: "value"
      }, totalPicks)), m("div", {
        className: "PickemList-cell type-stat"
      }, m("span", {
        className: "mobile-label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.headers.accuracy')), m("span", {
        className: "value"
      }, accuracy, "%")));
    })));
  };
  return LeaderboardTab;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/MatchesTab.tsx":
/*!*********************************************!*\
  !*** ./src/forum/components/MatchesTab.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MatchesTab)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Placeholder */ "flarum/common/components/Placeholder");
/* harmony import */ var flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _EventCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EventCard */ "./src/forum/components/EventCard.tsx");








var MatchesTab = /*#__PURE__*/function (_Component) {
  function MatchesTab() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.selectedSeason = 'all';
    _this.selectedTeam = 'all';
    _this.selectedStatus = 'all';
    _this.loading = false;
    _this.events = [];
    _this.totalEvents = 0;
    _this.page = 1;
    _this.limit = 10;
    _this.pickLoading = new Set();
    _this.picks = void 0;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(MatchesTab, _Component);
  var _proto = MatchesTab.prototype;
  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
    this.picks = this.attrs.picks;
    this.loadEvents(1);
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
    var offset = (this.page - 1) * this.limit;
    app.store.find('pickem-events', {
      include: 'homeTeam,awayTeam,week',
      filter: filters,
      sort: '-matchDate',
      page: {
        limit: this.limit,
        offset: offset
      }
    }).then(function (results) {
      _this3.events = results;
      _this3.totalEvents = results.payload.meta.total;
    })["catch"](function (error) {
      console.error(error);
    })["finally"](function () {
      _this3.loading = false;
      m.redraw();
    });
  };
  _proto.makePick = /*#__PURE__*/function () {
    var _makePick = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(eventId, outcome) {
      var eventIdStr, existingPick, updated, newPick, saved, _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            eventIdStr = String(eventId);
            existingPick = this.picks[eventIdStr];
            this.pickLoading.add(eventId);
            m.redraw();
            _context.prev = 1;
            if (!(existingPick && existingPick.selectedOutcome() === outcome)) {
              _context.next = 3;
              break;
            }
            _context.next = 2;
            return existingPick["delete"]();
          case 2:
            delete this.picks[eventIdStr];
            this.attrs.onPickChange(this.picks);
            app.alerts.show({
              type: 'success'
            }, app.translator.trans('huseyinfiliz-pickem.lib.messages.deleted'));
            _context.next = 7;
            break;
          case 3:
            if (!existingPick) {
              _context.next = 5;
              break;
            }
            _context.next = 4;
            return existingPick.save({
              selectedOutcome: outcome
            });
          case 4:
            updated = _context.sent;
            this.picks[eventIdStr] = updated;
            this.attrs.onPickChange(this.picks);
            app.alerts.show({
              type: 'success'
            }, app.translator.trans('huseyinfiliz-pickem.lib.messages.saved'));
            _context.next = 7;
            break;
          case 5:
            // Oluşturma işlemi - DÜZELTME BURADA:
            // eventId'yi save() metoduna attribute olarak ekliyoruz.
            // createRecord içine eklemek, JSON:API payload'una girmesini garanti etmez.
            newPick = app.store.createRecord('pickem-picks');
            _context.next = 6;
            return newPick.save({
              eventId: eventId,
              // API bu alanı attribute olarak bekliyor
              selectedOutcome: outcome
            });
          case 6:
            saved = _context.sent;
            this.picks[eventIdStr] = saved;
            this.attrs.onPickChange(this.picks);
            app.alerts.show({
              type: 'success'
            }, app.translator.trans('huseyinfiliz-pickem.lib.messages.saved'));
          case 7:
            _context.next = 9;
            break;
          case 8:
            _context.prev = 8;
            _t = _context["catch"](1);
            console.error('Pick error:', _t);
            if (_t.response && _t.response.errors && _t.response.errors[0]) {
              app.alerts.show({
                type: 'error'
              }, _t.response.errors[0].detail);
            } else {
              app.alerts.show({
                type: 'error'
              }, app.translator.trans('huseyinfiliz-pickem.lib.messages.invalid_outcome'));
            }
          case 9:
            _context.prev = 9;
            this.pickLoading["delete"](eventId);
            m.redraw();
            return _context.finish(9);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[1, 8, 9, 10]]);
    }));
    function makePick(_x, _x2) {
      return _makePick.apply(this, arguments);
    }
    return makePick;
  }();
  _proto.view = function view() {
    var _this4 = this;
    var allSeasons = app.store.all('pickem-seasons');
    var allTeams = app.store.all('pickem-teams');
    var hasEvents = this.events.length > 0;
    var canShowPagination = this.totalEvents > this.limit;
    return m("div", null, m("div", {
      className: "EventsTab-filters PickemPage-filters"
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
        value: season.id()
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
        value: team.id()
      }, team.name());
    }))), m("div", {
      className: "FilterGroup"
    }, m("label", null, m("i", {
      className: "fas fa-filter"
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
    }, app.translator.trans('huseyinfiliz-pickem.lib.status.finished'))))), this.loading ? m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default()), null) : !hasEvents ? m((flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_6___default()), {
      text: app.translator.trans('huseyinfiliz-pickem.lib.messages.no_matches')
    }) : m("div", {
      className: "MatchesList"
    }, this.events.map(function (event) {
      var eventIdStr = String(event.id());
      var pick = _this4.picks[eventIdStr];
      var isLoading = _this4.pickLoading.has(Number(event.id()));
      return m(_EventCard__WEBPACK_IMPORTED_MODULE_7__["default"], {
        event: event,
        pick: pick,
        onMakePick: function onMakePick(eventId, outcome) {
          return _this4.makePick(eventId, outcome);
        },
        isLoading: isLoading
      });
    })), canShowPagination && !this.loading && m("nav", {
      className: "Pagination"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "Button Pagination-button Pagination-previous",
      icon: "fas fa-chevron-left",
      disabled: this.page === 1,
      onclick: function onclick() {
        if (_this4.page > 1) _this4.loadEvents(_this4.page - 1);
      }
    }), m("span", {
      className: "Pagination-info"
    }, app.translator.trans('huseyinfiliz-pickem.lib.pagination.page_info', {
      current: this.page,
      total: Math.ceil(this.totalEvents / this.limit)
    })), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "Button Pagination-button Pagination-next",
      icon: "fas fa-chevron-right",
      disabled: this.page >= Math.ceil(this.totalEvents / this.limit),
      onclick: function onclick() {
        if (_this4.page < Math.ceil(_this4.totalEvents / _this4.limit)) {
          _this4.loadEvents(_this4.page + 1);
        }
      }
    })));
  };
  return MatchesTab;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/components/MyPicksTab.tsx":
/*!*********************************************!*\
  !*** ./src/forum/components/MyPicksTab.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MyPicksTab)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);



var MyPicksTab = /*#__PURE__*/function (_Component) {
  function MyPicksTab() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.picksPage = 0;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MyPicksTab, _Component);
  var _proto = MyPicksTab.prototype;
  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
    this.picksPage = 0;
  };
  _proto.view = function view() {
    var _this2 = this;
    if (!app.session.user) {
      return m("div", {
        className: "MyPicksPage-empty"
      }, m("p", null, app.translator.trans('huseyinfiliz-pickem.lib.messages.login_required')));
    }
    var picks = this.attrs.picks;
    var myPicks = Object.values(picks || {});
    if (!myPicks || myPicks.length === 0) {
      return m("div", {
        className: "MyPicksPage-empty"
      }, m("i", {
        className: "fas fa-clipboard-list",
        style: "font-size: 48px; opacity: 0.3; margin-bottom: 16px;"
      }), m("p", null, app.translator.trans('huseyinfiliz-pickem.lib.messages.no_data')));
    }

    // Sort by date (newest first)
    var sortedPicks = myPicks.filter(function (pick) {
      try {
        var ev = pick && (typeof pick.event === 'function' ? pick.event() : pick.event);
        return ev != null;
      } catch (_unused) {
        return false;
      }
    }).sort(function (a, b) {
      try {
        var eventA = typeof a.event === 'function' ? a.event() : a.event;
        var eventB = typeof b.event === 'function' ? b.event() : b.event;
        var dateA = eventA && typeof eventA.matchDate === 'function' ? new Date(eventA.matchDate()).getTime() : 0;
        var dateB = eventB && typeof eventB.matchDate === 'function' ? new Date(eventB.matchDate()).getTime() : 0;
        return dateB - dateA;
      } catch (_unused2) {
        return 0;
      }
    });
    var displayPicks = sortedPicks.slice(0, (this.picksPage + 1) * 10);
    var hasMore = sortedPicks.length > displayPicks.length;
    return m("div", null, m("div", {
      className: "PickemList PickemList--my-picks"
    }, m("div", {
      className: "PickemList-header"
    }, m("div", {
      className: "PickemList-cell type-match"
    }, app.translator.trans('huseyinfiliz-pickem.lib.common.match')), m("div", {
      className: "PickemList-cell type-date"
    }, app.translator.trans('huseyinfiliz-pickem.lib.common.date')), m("div", {
      className: "PickemList-cell type-pick"
    }, app.translator.trans('huseyinfiliz-pickem.forum.picks.your_pick')), m("div", {
      className: "PickemList-cell type-result"
    }, app.translator.trans('huseyinfiliz-pickem.lib.common.result')), m("div", {
      className: "PickemList-cell type-status"
    }, app.translator.trans('huseyinfiliz-pickem.lib.common.status'))), m("div", {
      className: "PickemList-body"
    }, displayPicks.map(function (pick) {
      var event = typeof pick.event === 'function' ? pick.event() : pick.event;
      if (!event) return null;
      var homeTeam = event.homeTeam ? event.homeTeam() : null;
      var awayTeam = event.awayTeam ? event.awayTeam() : null;
      var pickId = pick && (typeof pick.id === 'function' ? pick.id() : pick.id);
      var isCorrect = pick.isCorrect && typeof pick.isCorrect === 'function' ? pick.isCorrect() : null;

      // Satır için sınıf belirleme
      var itemClass = 'pending';
      if (isCorrect === true) itemClass = 'correct';
      if (isCorrect === false) itemClass = 'incorrect';
      var matchDate = '-';
      try {
        matchDate = dayjs(event.matchDate()).format('DD MMM YYYY');
      } catch (_unused3) {}
      return m("div", {
        key: String(pickId || Math.random()),
        className: "PickemList-item " + itemClass
      }, m("div", {
        className: "PickemList-cell type-match"
      }, m("span", {
        className: "mobile-label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.common.match')), m("span", {
        className: "value"
      }, homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.home'), ' ', app.translator.trans('huseyinfiliz-pickem.lib.common.vs'), ' ', awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.away'))), m("div", {
        className: "PickemList-cell type-date"
      }, m("span", {
        className: "mobile-label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.common.date')), m("span", {
        className: "value"
      }, matchDate)), m("div", {
        className: "PickemList-cell type-pick"
      }, m("span", {
        className: "mobile-label"
      }, app.translator.trans('huseyinfiliz-pickem.forum.picks.your_pick')), m("span", {
        className: "value"
      }, _this2.formatResult(pick.selectedOutcome(), homeTeam, awayTeam))), m("div", {
        className: "PickemList-cell type-result"
      }, m("span", {
        className: "mobile-label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.common.result')), m("span", {
        className: "value"
      }, event.result && event.result() ? _this2.formatResult(event.result(), homeTeam, awayTeam) : '-')), m("div", {
        className: "PickemList-cell type-status"
      }, m("span", {
        className: "mobile-label"
      }, app.translator.trans('huseyinfiliz-pickem.lib.common.status')), m("span", {
        className: "value"
      }, isCorrect === null ? m("span", {
        className: "PickStatus PickStatus--pending"
      }, m("i", {
        className: "fas fa-hourglass-half"
      }), " ", app.translator.trans('huseyinfiliz-pickem.lib.status.pending')) : isCorrect ? m("span", {
        className: "PickStatus PickStatus--correct"
      }, m("i", {
        className: "fas fa-check"
      }), " ", app.translator.trans('huseyinfiliz-pickem.lib.status.correct')) : m("span", {
        className: "PickStatus PickStatus--incorrect"
      }, m("i", {
        className: "fas fa-times"
      }), " ", app.translator.trans('huseyinfiliz-pickem.lib.status.incorrect')))));
    }))), hasMore && m("div", {
      className: "LoadMore"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button Button--primary",
      onclick: function onclick() {
        _this2.picksPage++;
        m.redraw();
      }
    }, app.translator.trans('huseyinfiliz-pickem.lib.buttons.load_more'))));
  };
  _proto.formatResult = function formatResult(result, homeTeam, awayTeam) {
    if (result === 'home') return homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.home');
    if (result === 'away') return awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.away');
    if (result === 'draw') return app.translator.trans('huseyinfiliz-pickem.lib.common.draw');
    return result;
  };
  return MyPicksTab;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/PickemPage.tsx":
/*!*********************************************!*\
  !*** ./src/forum/components/PickemPage.tsx ***!
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
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Page */ "flarum/common/components/Page");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _MatchesTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MatchesTab */ "./src/forum/components/MatchesTab.tsx");
/* harmony import */ var _MyPicksTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MyPicksTab */ "./src/forum/components/MyPicksTab.tsx");
/* harmony import */ var _LeaderboardTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LeaderboardTab */ "./src/forum/components/LeaderboardTab.tsx");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/common/helpers/listItems */ "flarum/common/helpers/listItems");
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_10__);











var PickemPage = /*#__PURE__*/function (_Page) {
  function PickemPage() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Page.call.apply(_Page, [this].concat(args)) || this;
    _this.activeTab = 'matches';
    _this.loading = true;
    _this.picks = {};
    _this.userScores = [];
    _this.filterDataLoaded = false;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(PickemPage, _Page);
  var _proto = PickemPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);
    if (!app.forum.attribute('pickem.canView')) {
      m.route.set('/');
      return;
    }
    this.activeTab = 'matches';
    this.loading = true;
    this.picks = {};
    this.userScores = [];
    this.filterDataLoaded = false;
    this.loadInitialData();
  };
  _proto.oncreate = function oncreate(vnode) {
    _Page.prototype.oncreate.call(this, vnode);
    // GÜNCELLENDİ
    app.setTitle(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_5___default()(app.translator.trans('huseyinfiliz-pickem.lib.nav.pickem')));
  };
  _proto.loadInitialData = /*#__PURE__*/function () {
    var _loadInitialData = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var promises, _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            promises = [];
            if (app.session.user && app.forum.attribute('pickem.makePicks')) {
              promises.push(this.loadPicks());
            }
            promises.push(this.loadLeaderboard());
            promises.push(this.loadFilterData());
            _context.next = 1;
            return Promise.all(promises);
          case 1:
            _context.next = 3;
            break;
          case 2:
            _context.prev = 2;
            _t = _context["catch"](0);
            console.error('Error loading initial data:', _t);
          case 3:
            _context.prev = 3;
            this.loading = false;
            this.filterDataLoaded = true;
            m.redraw();
            return _context.finish(3);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 2, 3, 4]]);
    }));
    function loadInitialData() {
      return _loadInitialData.apply(this, arguments);
    }
    return loadInitialData;
  }();
  _proto.loadPicks = /*#__PURE__*/function () {
    var _loadPicks = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2() {
      var picks, _t2;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!app.session.user || !app.forum.attribute('pickem.makePicks'))) {
              _context2.next = 1;
              break;
            }
            return _context2.abrupt("return");
          case 1:
            _context2.prev = 1;
            _context2.next = 2;
            return app.store.find('pickem-picks', {
              filter: {
                user: app.session.user.id()
              },
              include: 'event,event.homeTeam,event.awayTeam'
            });
          case 2:
            picks = _context2.sent;
            if (picks && Array.isArray(picks)) {
              this.picks = picks.reduce(function (acc, pick) {
                try {
                  var event = pick && (typeof pick.event === 'function' ? pick.event() : pick.event);
                  if (event && typeof event.id === 'function') {
                    acc[String(event.id())] = pick;
                  }
                } catch (err) {
                  console.warn('Invalid pick:', err);
                }
                return acc;
              }, {});
            }
            _context2.next = 4;
            break;
          case 3:
            _context2.prev = 3;
            _t2 = _context2["catch"](1);
            console.error('Error loading picks:', _t2);
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[1, 3]]);
    }));
    function loadPicks() {
      return _loadPicks.apply(this, arguments);
    }
    return loadPicks;
  }();
  _proto.loadLeaderboard = /*#__PURE__*/function () {
    var _loadLeaderboard = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3() {
      var scores, _t3;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 1;
            return app.store.find('pickem-user-scores', {
              include: 'user'
            });
          case 1:
            scores = _context3.sent;
            this.userScores = (scores || []).filter(function (s) {
              return s != null;
            });
            _context3.next = 3;
            break;
          case 2:
            _context3.prev = 2;
            _t3 = _context3["catch"](0);
            console.error('Error loading leaderboard:', _t3);
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[0, 2]]);
    }));
    function loadLeaderboard() {
      return _loadLeaderboard.apply(this, arguments);
    }
    return loadLeaderboard;
  }();
  _proto.loadFilterData = /*#__PURE__*/function () {
    var _loadFilterData = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee4() {
      var _t4;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 1;
            return Promise.all([app.store.find('pickem-public-seasons'), app.store.find('pickem-public-teams'), app.store.find('pickem-public-weeks')]);
          case 1:
            _context4.next = 3;
            break;
          case 2:
            _context4.prev = 2;
            _t4 = _context4["catch"](0);
            console.error('Error loading filter data:', _t4);
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 2]]);
    }));
    function loadFilterData() {
      return _loadFilterData.apply(this, arguments);
    }
    return loadFilterData;
  }();
  _proto.view = function view() {
    return m("div", {
      className: "IndexPage PickemPage"
    }, m("header", {
      className: "Hero PickemHero"
    }, m("div", {
      className: "container"
    }, m("div", {
      className: "containerNarrow"
    }, m("h1", {
      className: "Hero-title"
    }, m("i", {
      className: "icon fas fa-trophy"
    }), ' ', app.translator.trans('huseyinfiliz-pickem.lib.nav.pickem'))))), m("div", {
      className: "container"
    }, m("div", {
      className: "sideNavContainer"
    }, m("nav", {
      className: "IndexPage-nav sideNav"
    }, m("ul", null, flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_10___default()(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_9___default().prototype.sidebarItems().toArray()))), m("div", {
      className: "IndexPage-results sideNavOffset"
    }, m("div", {
      className: "PickemPage-tabs"
    }, this.renderTab('matches', app.translator.trans('huseyinfiliz-pickem.lib.nav.matches')), app.session.user && app.forum.attribute('pickem.makePicks') && this.renderTab('my_picks', app.translator.trans('huseyinfiliz-pickem.lib.nav.my_picks')), this.renderTab('leaderboard', app.translator.trans('huseyinfiliz-pickem.lib.nav.leaderboard'))), this.loading ? m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default()), null) : m("div", {
      className: "PickemPage-tabContent"
    }, this.renderAllTabs())))));
  };
  _proto.renderTab = function renderTab(tabId, label) {
    var _this2 = this;
    var active = this.activeTab === tabId;
    return m("button", {
      className: "Button Button--flat PickemPage-tab " + (active ? 'active' : ''),
      onclick: function onclick() {
        _this2.activeTab = tabId;
      }
    }, label);
  };
  _proto.renderAllTabs = function renderAllTabs() {
    var _this3 = this;
    return m('[', null, m("div", {
      className: "PickemPage-tabPane " + (this.activeTab === 'matches' ? 'active' : ''),
      "data-tab": "matches"
    }, this.filterDataLoaded && m(_MatchesTab__WEBPACK_IMPORTED_MODULE_6__["default"], {
      picks: this.picks,
      onPickChange: function onPickChange(picks) {
        _this3.picks = picks;
      }
    })), app.session.user && app.forum.attribute('pickem.makePicks') && m("div", {
      className: "PickemPage-tabPane " + (this.activeTab === 'my_picks' ? 'active' : ''),
      "data-tab": "my_picks"
    }, m(_MyPicksTab__WEBPACK_IMPORTED_MODULE_7__["default"], {
      picks: this.picks
    })), m("div", {
      className: "PickemPage-tabPane " + (this.activeTab === 'leaderboard' ? 'active' : ''),
      "data-tab": "leaderboard"
    }, m(_LeaderboardTab__WEBPACK_IMPORTED_MODULE_8__["default"], {
      userScores: this.userScores
    })));
  };
  return PickemPage;
}((flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/index.tsx":
/*!*****************************!*\
  !*** ./src/forum/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/extend */ "./src/common/extend.ts");
/* harmony import */ var _components_PickemPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/PickemPage */ "./src/forum/components/PickemPage.tsx");
/* harmony import */ var _components_EventResultNotification__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/EventResultNotification */ "./src/forum/components/EventResultNotification.tsx");







flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('huseyinfiliz/pickem', function () {
  _common_extend__WEBPACK_IMPORTED_MODULE_4__["default"].forEach(function (extender) {
    return extender.extend((flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default()));
  });
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes).pickem = {
    path: '/pickem',
    component: _components_PickemPage__WEBPACK_IMPORTED_MODULE_5__["default"]
  };
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'navItems', function (items) {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('pickem.canView')) {
      items.add('pickem', flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default().component({
        href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('pickem'),
        icon: 'fas fa-trophy'
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('huseyinfiliz-pickem.lib.nav.pickem')), 85);
    }
  });
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().notificationComponents).pickem_event_result = _components_EventResultNotification__WEBPACK_IMPORTED_MODULE_6__["default"];
});

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

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/LinkButton":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/LinkButton']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LinkButton'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Page":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Page']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Page'];

/***/ }),

/***/ "flarum/common/components/Placeholder":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['common/components/Placeholder']" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Placeholder'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/extenders":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/extenders']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extenders'];

/***/ }),

/***/ "flarum/common/helpers/listItems":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/listItems']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/listItems'];

/***/ }),

/***/ "flarum/common/utils/extractText":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/utils/extractText']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/extractText'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/IndexPage":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/IndexPage']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/IndexPage'];

/***/ }),

/***/ "flarum/forum/components/Notification":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['forum/components/Notification']" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/Notification'];

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
  !*** ./forum.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.tsx");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map