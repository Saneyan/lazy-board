export default (superClass) => {
  return class extends superClass {

    _getDirectView() {
      let child, children = [];

      for (let i in this.children) {
        child = this.children[i];
        if (child.tagName && child.tagName !== 'LAZY-BOARD-VIEW') {
          children.push(child);
        }
      }

      return children;
    }

    _getDirectLazyBoardView() {
      let child, children = [];

      for (let i in this.children) {
        child = this.children[i];
        if (child.tagName === 'LAZY-BOARD-VIEW') {
          children.push(child);
        }
      }

      return children;
    }
  }
}