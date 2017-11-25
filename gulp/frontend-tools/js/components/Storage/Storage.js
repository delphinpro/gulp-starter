/**
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const storageKey = 'frontend-tools-control-panel';

class Storage {
  constructor(init) {
    this.data = init;
    this.load();
  }

  setItem(name, value) {
    this.data[name] = value;
  }

  getItem(name) {
    return this.data[name];
  }

  save() {
    localStorage.setItem(storageKey, JSON.stringify(this.data));
    // console.log('Saved to storage:', this.data);
  }

  load() {
    let data = localStorage.getItem(storageKey);
    if (data) {
      this.data = data = JSON.parse(data);
    }
    // console.log('Load from storage:', data);
  }
}

export default new Storage({
  top   : 0,
  left  : 0,
  on    : false,
  invert: false,
  grid  : false,
});
