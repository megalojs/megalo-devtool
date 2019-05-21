/* eslint-disable no-underscore-dangle */
export function doUpdateComponent(root, component) {
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

export function findComponent(root, component) {
  let res = null;
  if (!root) {
    return res;
  }
  const { children } = root;
  if (root._uid === component._uid) {
    return root;
  }
  for (let i = 0; i < children.length; i += 1) {
    res = findComponent(children[i], component);
    if (res) {
      return res;
    }
  }
  return res;
}
