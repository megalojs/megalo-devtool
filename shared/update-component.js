/* eslint-disable no-underscore-dangle */
function doUpdateComponent(root, component) {
  if (!root) {
    return;
  }

  const { children } = root;
  if (root._uid === component._uid) {
    Object.assign(root, component);
  } else {
    for (let i = 0; i < children.length; i += 1) {
      if (children[i]._uid === component._uid) {
        doUpdateComponent(children[i], component);
        return;
      }
    }
  }
}

module.exports = doUpdateComponent;
