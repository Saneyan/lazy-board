export default (superClass) => {
  return class extends superClass {

    _getDirectView() {
      var child, children = [];

      for (var i in this.children) {
        child = this.children[i];
        if (child.tagName && child.tagName !== 'LAZY-BOARD-VIEW') {
          children.push(child);
        }
      }

      return children;
    }

    _getDirectLazyBoardView() {
      var child, children = [];

      for (var i in this.children) {
        child = this.children[i];
        if (child.tagName === 'LAZY-BOARD-VIEW') {
          children.push(child);
        }
      }

      return children;
    }
  }
}