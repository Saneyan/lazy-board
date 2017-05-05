export default class SyHomeView extends Polymer.Element {

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
