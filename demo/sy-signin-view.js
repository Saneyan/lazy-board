class SyAdminView extends Polymer.Element {

  static get is() {
    return 'sy-admin-view';
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.signin.addEventListener('click', () => {
      this.$.session.setSession('admin');
    });
  }
}

customElements.define(SyAdminView.is, SyAdminView);