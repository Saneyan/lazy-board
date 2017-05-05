export default class SySession extends Polymer.Element {

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

customElements.define(SySession.is, SySession);
