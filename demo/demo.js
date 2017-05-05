(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LazyBoardDemo"] = factory();
	else
		root["LazyBoardDemo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SyAdminView extends Polymer.Element {

  static get is() {
    return 'sy-admin-view';
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.signout.addEventListener('click', () => {
      this.$.session.revokeSession();
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SyAdminView;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SyApp extends Polymer.Element {

  static get is() {
    return 'sy-app';
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.board.addEventListener('lazy-board-unmatched-session', (e) => {
      switch (e.detail.expects) {
        case 'admin':
          console.log('Expected with admin session');
          break;
        case 'no_session':
          console.log('Expected without session');
          this.$.board.switchView('/components/lazy-board/demo/admin');
          break;
      }
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SyApp;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SyHomeView extends Polymer.Element {

  static get is() {
    return 'sy-home-view';
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.link.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('lazy-board-switch-view', {
        detail: {
          path: '/components/lazy-board/demo/signin'
        }
      }));
    })
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SyHomeView;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SyPictureListView extends Polymer.Element {

  static get is() {
    return 'sy-picture-list-view';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SyPictureListView;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SyPictureView extends Polymer.Element {

  static get is() {
    return 'sy-picture-view';
  }

  static get properties() {
    return {
      name: {
        type: String,
        value: ''
      },

      _pictureList: {
        type: Array,
        value: ['hiroshima', 'kagoshima']
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('lazy-board-view-entry', this._lazyBoardViewEntry.bind(this));
  }

  _lazyBoardViewEntry(e) {
    let name = this.name;

    if (this._pictureList.indexOf(name) !== -1) {
      this.name = e.detail.name;
    } else {
      // TODO: It must be implemented in lazy-board lib.
      window.dispatchEvent(new CustomEvent('lazy-board-not-found', {
        detail: { name }
      }));
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SyPictureView;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SySession extends Polymer.Element {

  static get is() {
    return 'sy-session';
  }

  static get properties() {
    return {
      session: {
        type: String,
        value: null,
        notify: true
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    let session = localStorage.getItem('session');

    if (session) {
      this.set('session', session);
    }

    window.addEventListener('storage', (e) => {
      if (e.key === 'session') {
        this.session = e.newValue;
      }
      console.log('ok')
    }, false);
  }

  setSession(session) {
    localStorage.setItem('session', session);
  }

  revokeSession() {
    localStorage.removeItem('session');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SySession;


customElements.define(SySession.is, SySession);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SySigninView extends Polymer.Element {

  static get is() {
    return 'sy-signin-view';
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.signin.addEventListener('click', () => {
      this.$.session.setSession('admin');
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SySigninView;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_sy_admin_view__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sy_home_view__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sy_picture_list_view__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sy_picture_view__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sy_session__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sy_signin_view__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sy_app__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SyAdminView", function() { return __WEBPACK_IMPORTED_MODULE_0__admin_sy_admin_view__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SyApp", function() { return __WEBPACK_IMPORTED_MODULE_6__sy_app__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SyHomeView", function() { return __WEBPACK_IMPORTED_MODULE_1__sy_home_view__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SyPictureListView", function() { return __WEBPACK_IMPORTED_MODULE_2__sy_picture_list_view__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SyPictureView", function() { return __WEBPACK_IMPORTED_MODULE_3__sy_picture_view__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SySession", function() { return __WEBPACK_IMPORTED_MODULE_4__sy_session__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SySigninView", function() { return __WEBPACK_IMPORTED_MODULE_5__sy_signin_view__["a"]; });










/***/ })
/******/ ]);
});