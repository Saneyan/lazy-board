export default class SySigninView extends Polymer.Element {

  static get is() {
    return 'sy-signin-view';
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.signin.addEventListener('click', () => {
      this.$.session.setSession('admin');
    });
  }
}
