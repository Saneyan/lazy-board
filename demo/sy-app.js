class SyApp extends Polymer.Element {

  static get is() {
    return 'sy-app';
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.board.addEventListener('lazy-board-unmatched-session', (e) => {
      switch (e.detail.expects) {
        case 'admin':
          break;
        case 'no_session':
          break;
      }
    });
  }
}

customElements.define(SyApp.is, SyApp);