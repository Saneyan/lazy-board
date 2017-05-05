export default class SyAdminView extends Polymer.Element {

  static get is() {
    return 'sy-admin-view';
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.signout.addEventListener('click', () => {
      this.$.session.revokeSession();
    });
  }
}
