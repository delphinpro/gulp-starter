/**
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

import storage from '../Storage/Storage';
import './button.scss';


const buttonClass       = 'ft-button';
const buttonActiveClass = 'ft-button_state_on';
const defaultOptions    = {
    indicator: true,
    classes  : null,
};

export default class Button {
    constructor(title, opts = defaultOptions) {
        this.active = storage.getItem(title);
        // console.log(title, this.active);

        this.el = document.createElement('button');
        this.el.classList.add(buttonClass);

        if (typeof opts.classes === 'string') {
            this.el.classList.add(opts.classes);
        }

        if (opts.indicator) {
            this.el.innerHTML = `<div class="${buttonClass}__light"><span></span></div>${title}`;
        } else {
            this.el.innerHTML = `${title}`;
        }

        this.el.classList.toggle(buttonActiveClass, this.active);
        document.documentElement.dataset[title] = this.active ? 'on' : 'off';

        this.el.addEventListener('click', event => {
            this.active = !this.active;
            this.el.classList.toggle(buttonActiveClass, this.active);
            document.documentElement.dataset[title] = this.active ? 'on' : 'off';
            storage.setItem(title, this.active);
            storage.save();
        });
    }

    appendTo(htmlElement) {
        htmlElement.appendChild(this.el);
    }
}
