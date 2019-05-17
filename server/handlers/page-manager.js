const doUpdateComponent = require('../../shared/update-component');

let pages = {};
const versions = {};

module.exports = {
  addPage(id, component) {
    pages[id] = component;
  },
  getPage(id) {
    return pages[id];
  },
  all() {
    return pages;
  },
  removePage(id) {
    delete pages[id];
  },
  clear() {
    pages = {};
  },
  syncComponent(id, component) {
    const page = this.getPage(id);
    doUpdateComponent(page && page.component, component);
  },
  syncVersions(_versions) {
    Object.assign(versions, _versions);
  },
  getVersions() {
    return versions;
  },
};
