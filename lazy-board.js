(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LazyBoard"] = factory();
	else
		root["LazyBoard"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((superClass) => {
  return class extends superClass {

    _getDirectView() {
      let child, children = [];

      for (let i in this.children) {
        child = this.children[i];
        if (child.tagName && child.tagName !== 'LAZY-BOARD-VIEW') {
          children.push(child);
        }
      }

      return children;
    }

    _getDirectLazyBoardView() {
      let child, children = [];

      for (let i in this.children) {
        child = this.children[i];
        if (child.tagName === 'LAZY-BOARD-VIEW') {
          children.push(child);
        }
      }

      return children;
    }
  }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_board_base_mixin__ = __webpack_require__(0);


class LazyBoardView extends __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lazy_board_base_mixin__["a" /* default */])(Polymer.Element) {

  static get is() {
    return 'lazy-board-view';
  }

  static get properties() {
    return {
      /**
       * The scope to use as a base name to import HTML.
       */
      scope: {
        type: String
      },

      sourceScope: {
        type: String
      },

      /**
       * Define restriction of the session name.
       */
      withSession: {
        type: String
      },

      /**
       * Define non-restriction of the session.
       */
      withoutSession: {
        type: Boolean,
        value: false
      }
    };
  }

  /**
   * Applying board data and board view data to direct views. This method also assigns them to
   * direct lazy-board-view children.
   *
   * boardData expects:
   *  {
   *    "sourceBaseUrl": String,
   *    "actualScope": String,
   *    "withSession": String, // Optional
   *    "withoutSession": String, // Optional
   *  }
   *
   * @param boardData
   */
  assignBoardData(boardData) {
    let directView = this._getDirectView();
    let directLazyBoardView = this._getDirectLazyBoardView();
    let scope = this.scope === '/' ? '' : this.scope;
    let sourceScope = !this.sourceScope ? scope : this.sourceScope === '/' ? '' : this.sourceScope;
    let actualScope, actualSourceScope, withSession, withoutSession;

    if (boardData.actualScope === '/' && scope.charAt(0) === '/') {
      actualScope = scope;
    } else {
      actualScope = boardData.actualScope + scope;
    }

    if (boardData.actualSourceScope === '/' && sourceScope.charAt(0) === '/') {
      actualSourceScope = sourceScope;
    } else {
      actualSourceScope = boardData.actualSourceScope + sourceScope;
    }

    if (this.withSession) {
      withSession = this.withSession;
    } else if (boardData.withSession) {
      withSession = boardData.withSession;
    }

    if (this.withoutSession) {
      withoutSession = this.withoutSession;
    } else if (boardData.withoutSession) {
      withoutSession = boardData.withoutSession;
    }

    directView.forEach((view) => {
      let viewPath = view.getAttribute('path');

      view.routePath = actualScope + (viewPath === '/' ? '' : viewPath);

      if (!view.hasAttribute('template-url')) {
        view.templateUrl = actualSourceScope.replace(/:/g, '_') + '/' + view.tagName.toLowerCase() + '.html';
      } else {
        view.templateUrl = view.getAttribute('template-url');
      }

      if (!view.hasAttribute('with-session') && withSession) {
        view.withSession = withSession;
      } else if (view.hasAttribute('with-session')) {
        view.withSession = view.getAttribute('with-session');
      }

      if (!view.hasAttribute('without-session') && withoutSession) {
        view.withoutSession = withoutSession;
      } else if (view.hasAttribute('without-session')) {
        view.withoutSession = true;
      }
    });

    // Overriding another properties.
    let newBoardData = {
       actualSourceScope,
       actualScope,
       withSession,
       withoutSession
    };

    directLazyBoardView.forEach((boardView) => {
      boardView.assignBoardData(newBoardData);
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = LazyBoardView;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_board_base_mixin__ = __webpack_require__(0);


class LazyBoard extends __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lazy_board_base_mixin__["a" /* default */])(Polymer.Element) {

  static get is() {
    return 'lazy-board';
  }

  static get observers() {
    return ['_routeChanged(_path, _queryParams, _routes, session)'];
  }

  static get properties() {
    return {
      /**
       * Base url for routing.
       */
      baseUrl: {
        type: String
      },

      /**
       * Base url for HTML imports.
       */
      sourceBaseUrl: {
        type: String
      },

      /**
       * Observing current session.
       */
      session: {
        type: String
      },

      lazySession: {
        type: Boolean,
        value: false
      },

      /**
       * Storing current view element.
       */
      currentView: {
        type: Object
      },

      /**
       * Storing route path and view tag name pairs.
       */
      _routes: {
        type: Array
      },

      _currentPath: {
        type: String
      },

      _currentQueryParams: {
        type: Object
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    // Preparing board data for each lazy-board-view. This object should be immutable.
    let boardData = {
      actualSourceScope: this.sourceBaseUrl || this.baseUrl,
      actualScope: this.baseUrl
    };

    // Assigning board data to each lazy-board-view
    this._getDirectLazyBoardView().forEach((boardView) => {
      boardView.assignBoardData(boardData);
    });

    let children = Polymer.dom(this).querySelectorAll(':not(lazy-board-view)');

    let routes = [];

    // Hiding all children except lazy-board-view and getting each route path and tag name.
    children.forEach((child) => {
      child.style.display = 'none';

      routes.push({
        path: child.routePath.replace(/^\//, '').split('/'),
        tagName: child.tagName.toLowerCase()
      });
    });

    this._routes = routes;

    if (!this.lazySession && !this.session) {
      this.session = null;
    }

    // Subscribing switching view event.
    window.addEventListener('lazy-board-switch-view', (e) => {
      this.switchView(e.detail.path);
    });
  }

  switchView(path) {
    this._path = path;
  }

  /**
   * Activating specific view element.
   *
   * @param tagName
   * @param routeOption
   */
  activateView(tagName, routeOption) {
    let templateUrl;
    let view = Polymer.dom(this).querySelector(tagName);

    // Current session and expected session is not matched, then aborting to activate.
    if (!this._matchSession(view)) {
      return;
    }

    // If there is active view, deactivate it to switch another view which is about to activate.
    if (this.currentView) {
      this.deactivateView();
    }

    // The current view is showing.
    this.currentView = view;

    view.style.display = 'block';

    if (view.is) {
      // The view has been registered, dispatch entry event with route option.
      view.dispatchEvent(new CustomEvent('lazy-board-view-entry', {
        detail: routeOption
      }));
    } else {
      // The view has not been registered, trying to import the HTML and dispatch entry event.
      templateUrl = this.resolveUrl(view.templateUrl, null, null, true);
      Polymer.importHref(templateUrl, this._importSuccess.bind(this, tagName, routeOption), this._importError.bind(this));
    }
  }

  /**
   * Deactivating current view element.
   * This method dispatches exit event for the view.
   */
  deactivateView() {
    if (this.currentView.is) {
      this.currentView.dispatchEvent(new CustomEvent('lazy-board-view-exit'));
    }
    // The current view is hiding.
    this.currentView.style.display = 'none';
    this.currentView = null;
  }

  /**
   * Observing route changing.
   *
   * @private
   */
  _routeChanged(_path, _queryParams, _routes, session) {
    if (this._currentPath === _path && this._currentQueryParams === _queryParams || !_routes || session === undefined) {
      return;
    }

    let ri, route, routeOption;
    let basePiece = _path.replace(/^\//, '').replace(/\/$/, '').split('/');

    for (ri = 0; ri < _routes.length; ri++) {
      route = _routes[ri];
      routeOption = this._matchRoute(route.path, basePiece);

      if (routeOption) {
        routeOption.queryParams = _queryParams;
        this.activateView(route.tagName, routeOption);
        break;
      }
    }

    this._currentPath = _path;
    this._currentQueryParams = _queryParams;

    // No routes matched. So it goes to view not found.
    if (_routes.length === ri) {
      this._notFound();
    }
  }

  /**
   * Checking view session.
   *
   * @param view
   * @returns {boolean}
   * @private
   */
  _matchSession(view) {
    if (view.withSession && view.withSession !== this.session) {
      this.dispatchEvent(new CustomEvent('lazy-board-unmatched-session', {
        detail: {
          expects: view.withSession
        }
      }));
      return false;
    }

    if (view.withoutSession && this.session && this.session !== 'no_session') {
      this.dispatchEvent(new CustomEvent('lazy-board-unmatched-session', {
        detail: {
          expects: 'no_session'
        }
      }));
      return false;
    }

    return true;
  }

  /**
   * Checking route path.
   *
   * @param routePiece
   * @param basePiece
   * @returns {*}
   * @private
   */
  _matchRoute(routePiece, basePiece) {
    let name;
    let routeOption = {};

    if (routePiece.length !== basePiece.length) {
      return false;
    }

    for (let pi in routePiece) {
      name = routePiece[pi];

      if (!basePiece[pi] === undefined) {
        return false;
      }

      if (name.charAt(0) === ':') {
        routeOption[name.substr(1, name.length - 1)] = basePiece[pi];
      } else if (name !== basePiece[pi]) {
        return false;
      }
    }

    return routeOption;
  }

  /**
   * Dispatches entry event if succeeding to import HTML.
   *
   * @param tagName
   * @param routeOption
   * @private
   */
  _importSuccess(tagName, routeOption) {
    let view = Polymer.dom(this).querySelector(tagName);
    view.dispatchEvent(new CustomEvent('lazy-board-view-entry', {
      detail: routeOption
    }));
  }

  /**
   * Prints importing error and dispatches not found method.
   *
   * @private
   */
  _importError() {
    console.error('IMPORT ERROR!!');
    this._notFound();
  }

  /**
   * Prints not found method.
   *
   * @private
   */
  _notFound() {
    console.error('NOT FOUND');
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = LazyBoard;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lazy_board_view__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lazy_board_base_mixin__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LazyBoard", function() { return __WEBPACK_IMPORTED_MODULE_0__lazy_board__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LazyBoardView", function() { return __WEBPACK_IMPORTED_MODULE_1__lazy_board_view__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LazyBoardMixin", function() { return __WEBPACK_IMPORTED_MODULE_2__lazy_board_base_mixin__["a"]; });






/***/ })
/******/ ]);
});