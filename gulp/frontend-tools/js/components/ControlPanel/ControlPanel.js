/**
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

import Button from '../Button/Button';
import storage from '../Storage/Storage';
import './control-panel.scss';


const panelClass         = `ft-control-panel`;
const buttonElementClass = `${panelClass}__button`;

class ControlPanel {
  constructor() {
    this.panel        = null;
    this.toggleButton = null;
  }

  create() {
    this.createPanel();

    // this.toggleButton = this.createToggleButton();
    this.btnPixel = this.createButton('on');
    this.createButton('invert');
    this.createButton('grid');
    // this.createButton('rhythm');

    document.documentElement.appendChild(this.panel);

    this.makeDraggable(this.panel);

    storage.load();

    let {top, left} = this.setPosition({top: storage.getItem('top'), left: storage.getItem('left')});

    storage.setItem('top', top);
    storage.setItem('left', left);
    storage.save();
  }

  setPosition(position) {
    let width  = this.panel.clientWidth;
    let height = this.panel.clientHeight;

    if (position.top < 0) position.top = 0;
    if (position.top + height > window.innerHeight) position.top = window.innerHeight - height;

    if (position.left < 0) position.left = 0;
    if (position.left + width > window.outerWidth) position.left = window.outerWidth - width;

    this.panel.style.top    = position.top + 'px';
    this.panel.style.left   = position.left + 'px';
    this.panel.style.right  = 'auto';
    this.panel.style.bottom = 'auto';

    return position;
  }

  makeDraggable(element) {
    let startPosition = {};
    let startMouse    = {};

    const moving = event => {
      let {top, left} = this.setPosition({
        top : (startPosition.top + (event.clientY - startMouse.top)),
        left: (startPosition.left + (event.clientX - startMouse.left)),
      });

      storage.setItem('top', top);
      storage.setItem('left', left);
    };

    const endMove = () => {
      document.removeEventListener('mousemove', moving);
      document.removeEventListener('mouseup', endMove);
      storage.save();
    };

    const startMove = event => {
      if (event.target !== element) return;
      let styles    = getComputedStyle(this.panel);
      startPosition = {
        top : parseInt(styles.top.replace('px', '')),
        left: parseInt(styles.left.replace('px', '')),
      };
      startMouse    = {top: event.clientY, left: event.clientX};

      document.addEventListener('mousemove', moving);
      document.addEventListener('mouseup', endMove);
    };

    element.addEventListener('mousedown', startMove);
  }

  createPanel() {
    this.panel = document.createElement('div');
    this.panel.classList.add(panelClass);
  }

  createButton(name) {
    let wrapper = document.createElement('div');
    wrapper.classList.add(buttonElementClass);
    let button = new Button(name);
    button.appendTo(wrapper);
    this.panel.appendChild(wrapper);
    return button;
  }

  createToggleButton() {
    let wrapper = document.createElement('div');
    wrapper.classList.add(buttonElementClass);
    let button = new Button('<span></span>', {indicator: false, classes: 'ft-button_drag'});
    button.appendTo(wrapper);
    this.panel.appendChild(wrapper);
    return button;
  }
}

export default new ControlPanel();
