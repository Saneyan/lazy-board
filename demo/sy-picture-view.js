export default class SyPictureView extends Polymer.Element {

  static get is() {
    return 'sy-picture-view';
  }

  static get properties() {
    return {
      name: {
        type: String,
        value: ''
      },

      _pictureList: {
        type: Array,
        value: ['hiroshima', 'kagoshima']
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('lazy-board-view-entry', this._lazyBoardViewEntry.bind(this));
  }

  _lazyBoardViewEntry(e) {
    let name = this.name;

    if (this._pictureList.indexOf(name) !== -1) {
      this.name = e.detail.name;
    } else {
      // TODO: It must be implemented in lazy-board lib.
      window.dispatchEvent(new CustomEvent('lazy-board-not-found', {
        detail: { name }
      }));
    }
  }
}
