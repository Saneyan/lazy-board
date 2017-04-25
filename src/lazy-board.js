import LazyBoardMixin from './lazy-board-mixin';

export default class LazyBoard extends LazyBoardMixin(Polymer.Element) {

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