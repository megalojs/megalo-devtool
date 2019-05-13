/* eslint-disable no-underscore-dangle */
function doUpdateVM(root, vm) {
  const { children } = root;
  if (root._uid === vm._uid) {
    Object.assign(root, vm);
  } else {
    for (let i = 0; i < children.length; i += 1) {
      if (children[i]._uid === vm._uid) {
        doUpdateVM(children[i], vm);
        return;
      }
    }
  }
}

module.exports = doUpdateVM;
