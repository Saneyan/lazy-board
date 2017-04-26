/******/ (function(modules) { // webpackBootstrap
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
      var child, children = [];

      for (var i in this.children) {
        child = this.children[i];
        if (child.tagName && child.tagName !== 'LAZY-BOARD-VIEW') {
          children.push(child);
        }
      }

      return children;
    }

    _getDirectLazyBoardView() {
      var child, children = [];

      for (var i in this.children) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_board_mixin__ = __webpack_require__(0);


class LazyBoardView extends __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lazy_board_mixin__["a" /* default */])(Polymer.Element) {

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
    let actualScope, withSession, withoutSession;

    if (boardData.actualScope === '/' && scope.charAt(0) === '/') {
      actualScope = scope;
    } else {
      actualScope = boardData.actualScope + scope;
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

    directView.forEach(function (view) {
      let sourceScope;
      let path = view.getAttribute('path');

      view.routePath = actualScope + (path === '/' ? '' : path);

      if (!view.templateUrl) {
        if (this.sourceScope) {
          sourceScope = this.sourceScope === '/' ? boardData.actualScope : boardData.actualScope + this.sourceScope;
        } else {
          sourceScope = actualScope;
        }
        sourceScope = sourceScope.replace(/:/g, '_');
        view.templateUrl = boardData.sourceBaseUrl + sourceScope + '/' + view.tagName.toLowerCase() + '.html';
      }

      if (!view.withSession && withSession) {
        view.withSession = withSession;
      }

      if (!view.withoutSession && withoutSession) {
        view.withoutSession = withoutSession;
      }
    }.bind(this));

    // Inheriting prefix and sourceBaseUrl, but overriding another properties.
    let newBoardData = {
      sourceBaseUrl: boardData.sourceBaseUrl,
      actualScope: actualScope,
      withSession: withSession,
      withoutSession: withoutSession
    };

    directLazyBoardView.forEach(function (boardView) {
      boardView.assignBoardData(newBoardData);
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = LazyBoardView;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_board_mixin__ = __webpack_require__(0);


class LazyBoard extends __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lazy_board_mixin__["a" /* default */])(Polymer.Element) {

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
      sourceBaseUrl: this.sourceBaseUrl,
      actualScope: this.baseUrl
    };

    // Assigning board data to each lazy-board-view
    this._getDirectLazyBoardView().forEach(function (boardView) {
      boardView.assignBoardData(boardData);
    });

    let children = Polymer.dom(this).querySelectorAll(':not(lazy-board-view)');

    let routes = [];

    // Hiding all children except lazy-board-view and getting each route path and tag name.
    children.forEach(function (child) {
      child.style.display = 'none';

      routes.push({
        path: child.routePath.replace(/^\//, '').split('/'),
        tagName: child.tagName.toLowerCase()
      });
    }.bind(this));

    this._routes = routes;

    if (!this.lazySession && !this.session) {
      this.session = null;
    }
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
      view.fire('lazy-board-view-entry', routeOption);
    } else {
      // The view has not been registered, trying to import the HTML and dispatch entry event.
      templateUrl = this.resolveUrl(view.templateUrl, null, null, true);
      this.importHref(templateUrl, this._importSuccess.bind(this, tagName, routeOption), this._importError);
    }
  }

  /**
   * Deactivating current view element.
   * This method dispatches exit event for the view.
   */
  deactivateView() {
    if (this.currentView.is) {
      this.currentView.fire('lazy-board-view-exit');
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
  _routeChanged(/* [_path, _queryParams, _route, session] */) {
    if (this._currentPath === this._path && this._currentQueryParams === this._queryParams) {
      return;
    }

    let route, routeOption;
    let basePiece = this._path.replace(/^\//, '').split('/');

    for (let ri = 0; ri < this._routes.length; ri++) {
      route = this._routes[ri];
      routeOption = this._matchRoute(route.path, basePiece);

      if (routeOption) {
        routeOption.queryParams = this._queryParams;
        this.activateView(route.tagName, routeOption);
        break;
      }
    }

    this._currentPath = this._path;
    this._currentQueryParams = this._queryParams;

    // No routes matched. So it goes to view not found.
    if (this._routes.length === ri) {
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
      this.fire('lazy-board-unmatched-session', {
        expects: view.withSession
      });
      return false;
    }

    if (view.withoutSession && this.session && this.session !== 'no_session') {
      this.fire('lazy-board-unmatched-session', {
        expects: 'no_session'
      });
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
    view.fire('lazy-board-view-entry', routeOption);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lazy_board_mixin__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LazyBoard", function() { return __WEBPACK_IMPORTED_MODULE_0__lazy_board__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LazyBoardView", function() { return __WEBPACK_IMPORTED_MODULE_1__lazy_board_view__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LazyBoardMixin", function() { return __WEBPACK_IMPORTED_MODULE_2__lazy_board_mixin__["a"]; });






/***/ })
/******/ ]);