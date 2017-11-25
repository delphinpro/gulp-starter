/**
 * Only for the development stage. Remove in production.
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

'use strict';

import cp from './components/ControlPanel/ControlPanel';
import './dev.scss';


(function() {

  // let button = new Button();
  // button.message();

  let gridColumns = 12;
  let cssPrefix   = 'dev-grid';
  let cssFlag     = 'dev-mode';

  /* Fork https://github.com/yoksel/pixel-glass-js */
  function pixelGlass() {

    'use strict';

    let doc           = document;
    let controlsPanel;
    let bodyContentWrapper;
    let panelClass    = 'controls-panel';
    let canBeDisabled = [];

    let prefix      = 'pg';
    let filtersList = ['none', 'invert'];
    let statesList  = ['off', 'on'];

    let currents = {
      mode   : getCurrent('mode', statesList[1]),
      state  : getCurrent('state', statesList[1]),
      filter : getCurrent('filter', filtersList[0]),
      opacity: getCurrent('opacity', 0.5),
    };

    let targets = {
      mode   : {
        elem: doc.body,
        attr: 'class',
      },
      state  : {
        elem: doc.documentElement,
        attr: 'data',
      },
      filter : {
        elem: doc.body,
        attr: 'data',
      },
      opacity: {
        elem: doc.body,
        attr: 'style',
      },
    };

    // States switcher params
    let paramsStates = {
      elemTag      : 'button',
      elemText     : 'on',
      listName     : 'states',
      itemName     : 'state',
      target       : targets.state,
      type         : 'button',
      list         : statesList,
      canDisableAll: true,
      attrs        : {
        tabindex: 1,
      },
    };

    // DevMode switcher params
    let paramModes = {
      elemTag      : 'button',
      elemText     : 'grid',
      listName     : 'modes',
      itemName     : 'mode',
      target       : targets.mode,
      type         : 'button',
      list         : statesList,
      canDisableAll: true,
      attrs        : {
        tabindex: 1,
      },
    };

    // Filters switcher params
    let paramsFilters = {
      elemTag : 'button',
      elemText: 'invert',
      listName: 'filters',
      itemName: 'filter',
      target  : targets.filter,
      type    : 'button',
      list    : filtersList,
      attrs   : {
        tabindex: 2,
      },
    };

    // Opacity range params
    let paramsOpacity = {
      itemName: 'opacity',
      type    : 'number',
      target  : targets.opacity,
      setAttr : 'style',
      attrs   : {
        min     : 0,
        max     : 1,
        step    : 0.1,
        tabindex: 3,
      },
    };

    //---------------------------------------------

    init();

    //---------------------------------------------

    function init() {
      createControlsPanel();
      applyCurrentData();

      if (currents.state === 'on') {
        applyCurrentStyles();
      }
    }

    //---------------------------------------------

    function createControlsPanel() {
      let targetElem = doc.documentElement;

      if (doc.body.dataset.hasStickyPoint !== undefined) {
        let stickyPoint = doc.querySelector('.sticky-point');

        if (stickyPoint && !localStorage['pg-released']) {
          targetElem = stickyPoint;
        }
        // Override defaults for demo page
        currents.state = 'off';
      }

      controlsPanel = doc.createElement('div');
      controlsPanel.classList.add(panelClass);
      targetElem.appendChild(controlsPanel);
      let sides = ['top', 'right', 'bottom', 'left'];

      sides.forEach(function(item) {
        let itemVal = getCurrent(item, '');
        if (itemVal) {
          controlsPanel.style[item] = itemVal;
        }
      });

      initControls();
    }

    //---------------------------------------------

    function initControls() {
      createButton(paramsStates);
      createButton2(paramModes);
      createButton(paramsFilters);
      createInputNumber(paramsOpacity);

      createDragButton();
    }

    //---------------------------------------------

    function createButton(params) {
      let listName      = params.listName;
      let itemName      = params.itemName;
      let elemTag       = params.elemTag;
      let elemText      = params.elemText;
      let type          = params.type;
      let list          = params.list;
      let action        = params.action;
      let currentVal    = currents[itemName];
      let attrs         = params.attrs;
      let currentNum    = list.indexOf(currentVal);
      let canDisableAll = params.canDisableAll;

      let id    = itemName;
      let input = doc.createElement(elemTag);
      input.classList.add(panelClass + '__control', panelClass +
          '__control--' +
          type);
      input.setAttribute('type', type);
      input.setAttribute('id', id);
      input.dataset.stateNum = currentNum;

      if (attrs) {
        for (let attr in attrs) {
          if (attrs.hasOwnProperty(attr)) {
            input.setAttribute(attr, attrs[attr]);
          }
        }
      }

      if (elemTag === 'button') {
        input.innerHTML = elemText;
      }

      if (!canDisableAll) {
        canBeDisabled.push(input);
      }

      controlsPanel.appendChild(input);

      input.onclick = function() {
        if (!params.target) {
          return;
        }

        currentNum = +!currentNum;
        currentVal = list[currentNum];

        input.dataset.stateNum               = currentNum;
        params.target.elem.dataset[itemName] = currentVal;
        saveLocalStorage(itemName, currentVal);

        if (canDisableAll && canDisableAll === true) {
          if (currentVal === 'off') {
            removeCurrentStyles();
            disableInputs();
          }
          else {
            applyCurrentStyles();
            enableInputs();
          }
        }
      };
    }

    function createButton2(params) {
      let listName      = params.listName;
      let itemName      = params.itemName;
      let elemTag       = params.elemTag;
      let elemText      = params.elemText;
      let type          = params.type;
      let list          = params.list;
      let action        = params.action;
      let currentVal    = currents[itemName];
      let attrs         = params.attrs;
      let currentNum    = list.indexOf(currentVal);
      let canDisableAll = params.canDisableAll;

      let id    = itemName;
      let input = doc.createElement(elemTag);
      input.classList.add(panelClass + '__control', panelClass +
          '__control--' +
          type);
      input.setAttribute('type', type);
      input.setAttribute('id', id);
      input.dataset.stateNum = currentNum;

      if (attrs) {
        for (let attr in attrs) {
          if (attrs.hasOwnProperty(attr)) {
            input.setAttribute(attr, attrs[attr]);
          }
        }
      }

      if (elemTag === 'button') {
        input.innerHTML = elemText;
      }

      if (!canDisableAll) {
        canBeDisabled.push(input);
      }

      controlsPanel.appendChild(input);

      input.onclick = function() {
        if (!params.target) {
          return;
        }

        currentNum = +!currentNum;
        currentVal = list[currentNum];

        input.dataset.stateNum = currentNum;
        saveLocalStorage(itemName, currentVal);

        if (canDisableAll && canDisableAll === true) {
          if (currentVal === 'off') {
            params.target.elem.classList.remove('dev-mode');
          }
          else {
            params.target.elem.classList.add('dev-mode');
          }
        }
      };

      currentVal = list[currentNum];

      input.dataset.stateNum = currentNum;
      saveLocalStorage(itemName, currentVal);

      if (canDisableAll && canDisableAll === true) {
        if (currentVal === 'off') {
          params.target.elem.classList.remove('dev-mode');
        }
        else {
          params.target.elem.classList.add('dev-mode');
        }
      }
    }

    //---------------------------------------------

    function createInputNumber(params) {
      let itemName      = params.itemName;
      let attrs         = params.attrs;
      let type          = params.type;
      let setAttr       = params.setAttr;
      let canDisableAll = params.canDisableAll;

      let id    = itemName;
      let input = doc.createElement('input');
      input.classList.add(panelClass + '__control', panelClass +
          '__control--' +
          type);
      input.setAttribute('type', type);
      input.setAttribute('id', id);

      for (let attr in attrs) {
        input.setAttribute(attr, attrs[attr]);
      }
      input.setAttribute('value', currents[itemName]);

      if (!canDisableAll) {
        canBeDisabled.push(input);
      }

      controlsPanel.appendChild(input);

      input.oninput = function() {
        if (setAttr === 'style') {
          params.target.elem.style[itemName] = this.value;
          saveLocalStorage(itemName, this.value);
        }
      };
    }

    //---------------------------------------------

    function createDragButton() {
      let input = doc.createElement('button');
      input.classList.add(panelClass + '__control', panelClass +
          '__control--drag-n-drop');
      input.setAttribute('type', 'button');

      controlsPanel.appendChild(input);

      input.onmousedown = function() {
        //Place it here to get real sizes after
        // external styles has been loaded
        let offsetTop  = this.offsetTop;
        let offsetLeft = controlsPanel.clientWidth - this.clientWidth;
        let styles     = getComputedStyle(controlsPanel);

        controlsPanel.style.top    = styles.top;
        controlsPanel.style.left   = styles.left;
        controlsPanel.style.right  = 'auto';
        controlsPanel.style.bottom = 'auto';

        doc.onmousemove = function(ev) {
          let x = (ev.clientX - offsetLeft ) + 'px';
          let y = (ev.clientY) + 'px';

          controlsPanel.style.left = x;
          controlsPanel.style.top  = y;
        };
      };

      input.onmouseup = function() {
        let styles = getComputedStyle(controlsPanel);
        let left   = +styles.left.replace(/px/, '');
        let right  = +styles.right.replace(/px/, '');
        let top    = +styles.top.replace(/px/, '');
        let bottom = +styles.bottom.replace(/px/, '');

        if (left > right) {
          saveLocalStorage('left', 'auto');
          saveLocalStorage('right', styles.right);

          controlsPanel.style.right = styles.right;
          controlsPanel.style.left  = 'auto';
        }
        else {
          saveLocalStorage('left', styles.left);
          saveLocalStorage('right', 'auto'); //'auto' needs to override default position;
        }
        if (top > bottom) {
          saveLocalStorage('top', 'auto');
          saveLocalStorage('bottom', styles.bottom);

          controlsPanel.style.bottom = styles.bottom;
          controlsPanel.style.top    = 'auto';
        }
        else {
          saveLocalStorage('top', styles.top);
          saveLocalStorage('bottom', 'auto');
        }

        doc.onmousemove = null;
      };
    }

    //---------------------------------------------

    function disableInputs() {
      canBeDisabled.forEach(function(item) {
        item.setAttribute('disabled', '');
      });
    }

    //---------------------------------------------

    function enableInputs() {
      canBeDisabled.forEach(function(item) {
        item.removeAttribute('disabled');
      });
    }

    //---------------------------------------------

    function getCurrent(name, defaultValue) {
      let itemName        = [prefix, name].join('-');
      let localStorageVal = localStorage[itemName];
      return localStorageVal ? localStorageVal : defaultValue;
    }

    //---------------------------------------------

    function saveLocalStorage(name, value) {
      let itemName           = [prefix, name].join('-');
      localStorage[itemName] = value;
    }

    //---------------------------------------------

    // Not used
    function getBodyOpacity() {
      let opacityStr = getComputedStyle(doc.body).opacity;
      return +opacityStr;
    }

    //---------------------------------------------

    // Not used
    function addExternalCSS() {
      let styleElem = doc.createElement('style');
      let cssLink   = doc.createElement('link');
      cssLink.setAttribute('rel', 'stylesheet');
      cssLink.setAttribute('href', '../pixel-glass-js/styles.css');

      doc.head.appendChild(cssLink);
    }

    //---------------------------------------------

    function applyCurrentData() {
      for (let key in targets) {
        let target  = targets[key];
        let current = currents[key];

        if (target.attr === 'data') {
          target.elem.dataset[key] = current;
        }
      }

      if (currents.state === 'off') {
        disableInputs();
      }
    }

    //---------------------------------------------

    function applyCurrentStyles() {
      for (let key in targets) {
        let target  = targets[key];
        let current = currents[key];

        if (target.attr === 'style') {
          target.elem.style[key] = current;
        }
      }
    }

    //---------------------------------------------

    function removeCurrentStyles() {
      for (let key in targets) {
        let target = targets[key];

        if (target.attr === 'style') {
          target.elem.style[key] = '';
        }
      }
    }

    //---------------------------------------------
  }

  function domReady(fn) {
    (document.readyState != 'loading') ? fn() : document.addEventListener(
        'DOMContentLoaded', fn);
  }

  function elem(cls, tag) {
    let el;
    el           = document.createElement(tag || 'div');
    el.className = cls;
    return el;
  }

  function addHashes() {
    let elements = document.querySelectorAll('a');
    Array.prototype.forEach.call(elements, function(el) {
      if (el.hash == '') {
        el.hash = '#dev';
      }
    });
  }

  function removeHashes() {
    let elements = document.querySelectorAll('a');
    Array.prototype.forEach.call(elements, function(el) {
      if (el.hash == '#dev') {
        el.hash = '';
      }
    });
  }

  function switchGrid() {
    location.hash = document.body.classList.contains(cssFlag) ? '' : '#dev';
  }

  domReady(function() {
    let checkHash;
    let isGridBuilt = false;
    checkHash       = function() {
      let row, container, grid, i;
      if (!isGridBuilt) {
        isGridBuilt = true;
        grid        = elem(cssPrefix);
        container   = elem(cssPrefix + '__container');
        row         = elem(cssPrefix + '__row');
        for (i = 0; i < gridColumns; i++) {
          row.appendChild(elem(cssPrefix + '__col'));
        }
        container.appendChild(row);
        grid.appendChild(container);
        document.documentElement.appendChild(grid);
      }
      if (location.hash == '#dev') {
        document.body.classList.add(cssFlag);
        addHashes();
      } else {
        document.body.classList.remove(cssFlag);
        removeHashes();
      }
    };
    window.addEventListener('hashchange', checkHash);
    let switcher = document.querySelector('#switch-grid');
    if (switcher) {
      switcher.addEventListener('click', switchGrid);
    }
    checkHash();
    if (!document.body.classList.contains('index-page')) {
      //pixelGlass();
    }

    function isTouchDevice() {
      return 'ontouchstart' in window        // works on most browsers
          || navigator.maxTouchPoints;       // works on IE10/11 and Surface
    }

    if (!isTouchDevice()) {
      cp.create();
    }

  });
})();
