import LazyBoardMixin from './lazy-board-mixin';

export default class LazyBoardView extends LazyBoardMixin(Polymer.Element) {

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

    directView.forEach(function (view) {
      let path = view.getAttribute('path');

      view.routePath = actualScope + (path === '/' ? '' : path);

      if (!view.templateUrl) {
        view.templateUrl = actualSourceScope.replace(/:/g, '_') + '/' + view.tagName.toLowerCase() + '.html';
      }

      if (!view.withSession && withSession) {
        view.withSession = withSession;
      }

      if (!view.withoutSession && withoutSession) {
        view.withoutSession = withoutSession;
      }
    }.bind(this));

    // Overriding another properties.
    let newBoardData = {
       actualSourceScope,
       actualScope,
       withSession,
       withoutSession
    };

    directLazyBoardView.forEach(function (boardView) {
      boardView.assignBoardData(newBoardData);
    });
  }

}

customElements.define(LazyBoardView.is, LazyBoardView);