class SySession extends Polymer.Element {

  static get is() {
    return 'sy-session';
  }

  static get properties() {
    return {
      session: {
        type: String,
        value: null
      }
    };
  }

  setSession(session) {
    this.session = session;
  }

  revokeSession() {
    this.session = null;
  }
}

customElements.define(SySession.is, SySession);