const doUpdateVM = require('../shared/update-vm');

let pages = {};

module.exports = {
  addPage(id, vm) {
    pages[id] = vm;
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
  updateVM(id, vm) {
    const page = this.getPage(id);
    doUpdateVM(page, vm);
  }
}
