export default (superClass) => {

  return class extends superClass {

    switchView(path) {
      window.dispatchEvent(new CustomEvent('lazy-board-switch-view', {
        detail: { path }
      }));
    }

    notifyNotFound() {
      window.dispatchEvent(new CustomEvent('lazy-board-not-found'));
    }
  }
}
