export default class SyApp extends Polymer.Element {

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
