import { LitElement, html } from '@polymer/lit-element';
import LazyBoardBaseMixin from './lazy-board-base-mixin';

class LazyBoardView extends LazyBoardBaseMixin(LitElement) {

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
    const directView = this._getDirectView();
    const directLazyBoardView = this._getDirectLazyBoardView();
    const scope = this.scope === '/' ? '' : this.scope;
    const sourceScope = !this.sourceScope ? scope : this.sourceScope === '/' ? '' : this.sourceScope;
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
      const viewPath = view.getAttribute('path');

      view.routePath = actualScope + (viewPath === '/' ? '' : viewPath);

      if (!view.hasAttribute('template-url')) {
        view.templateUrl = actualSourceScope.replace(/\/:/g, '/_') + '/' + view.tagName.toLowerCase() + '.js';
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
    const newBoardData = {
       actualSourceScope,
       actualScope,
       withSession,
       withoutSession
    };

    directLazyBoardView.forEach((boardView) => {
      boardView.assignBoardData(newBoardData);
    });
  }

  _render() {
    html`<slot></slot>`;
  }

}

window.customElements.define('lazy-board-view', LazyBoardView);

export default LazyBoardView;
