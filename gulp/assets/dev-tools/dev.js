/**
 * Only for the development stage. Remove in production.
 */
(function () {
    "use strict";

    var gridColumns = 12;
    var cssPrefix   = 'dev-grid';
    var cssFlag     = 'dev-mode';

    /* Fork https://github.com/yoksel/pixel-glass-js */
    function pixelGlass() {

        'use strict';

        var doc           = document;
        var controlsPanel;
        var bodyContentWrapper;
        var panelClass    = 'controls-panel';
        var canBeDisabled = [];

        var prefix      = 'pg';
        var filtersList = ['none', 'invert'];
        var statesList  = ['off', 'on'];

        var currents = {
            mode  : getCurrent('mode', statesList[1]),
            state  : getCurrent('state', statesList[1]),
            filter : getCurrent('filter', filtersList[0]),
            opacity: getCurrent('opacity', 0.5)
        };

        var targets = {
            mode  : {
                elem: doc.body,
                attr: 'class'
            },
            state  : {
                elem: doc.documentElement,
                attr: 'data'
            },
            filter : {
                elem: doc.body,
                attr: 'data'
            },
            opacity: {
                elem: doc.body,
                attr: 'style'
            }
        };

        // States switcher params
        var paramsStates = {
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
            }
        };

        // DevMode switcher params
        var paramModes = {
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
            }
        };

        // Filters switcher params
        var paramsFilters = {
            elemTag : 'button',
            elemText: 'invert',
            listName: 'filters',
            itemName: 'filter',
            target  : targets.filter,
            type    : 'button',
            list    : filtersList,
            attrs   : {
                tabindex: 2,
            }
        };

        // Opacity range params
        var paramsOpacity = {
            itemName: 'opacity',
            type    : 'number',
            target  : targets.opacity,
            setAttr : 'style',
            attrs   : {
                min     : 0,
                max     : 1,
                step    : 0.1,
                tabindex: 3,
            }
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
            var targetElem = doc.documentElement;

            if (doc.body.dataset.hasStickyPoint !== undefined) {
                var stickyPoint = doc.querySelector('.sticky-point');

                if (stickyPoint && !localStorage['pg-released']) {
                    targetElem = stickyPoint;
                }
                // Override defaults for demo page
                currents.state = 'off';
            }

            controlsPanel = doc.createElement('div');
            controlsPanel.classList.add(panelClass);
            targetElem.appendChild(controlsPanel);
            var sides = ['top', 'right', 'bottom', 'left'];

            sides.forEach(function (item) {
                var itemVal = getCurrent(item, '');
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
            var listName      = params.listName;
            var itemName      = params.itemName;
            var elemTag       = params.elemTag;
            var elemText      = params.elemText;
            var type          = params.type;
            var list          = params.list;
            var action        = params.action;
            var currentVal    = currents[itemName];
            var attrs         = params.attrs;
            var currentNum    = list.indexOf(currentVal);
            var canDisableAll = params.canDisableAll;

            var id    = itemName;
            var input = doc.createElement(elemTag);
            input.classList.add(panelClass + '__control', panelClass + '__control--' + type);
            input.setAttribute('type', type);
            input.setAttribute('id', id);
            input.dataset.stateNum = currentNum;

            if (attrs) {
                for (var attr in attrs) {
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

            input.onclick = function () {
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
            var listName      = params.listName;
            var itemName      = params.itemName;
            var elemTag       = params.elemTag;
            var elemText      = params.elemText;
            var type          = params.type;
            var list          = params.list;
            var action        = params.action;
            var currentVal    = currents[itemName];
            var attrs         = params.attrs;
            var currentNum    = list.indexOf(currentVal);
            var canDisableAll = params.canDisableAll;

            var id    = itemName;
            var input = doc.createElement(elemTag);
            input.classList.add(panelClass + '__control', panelClass + '__control--' + type);
            input.setAttribute('type', type);
            input.setAttribute('id', id);
            input.dataset.stateNum = currentNum;

            if (attrs) {
                for (var attr in attrs) {
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

            input.onclick = function () {
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
            var itemName      = params.itemName;
            var attrs         = params.attrs;
            var type          = params.type;
            var setAttr       = params.setAttr;
            var canDisableAll = params.canDisableAll;

            var id    = itemName;
            var input = doc.createElement('input');
            input.classList.add(panelClass + '__control', panelClass + '__control--' + type);
            input.setAttribute('type', type);
            input.setAttribute('id', id);

            for (var attr in attrs) {
                input.setAttribute(attr, attrs[attr]);
            }
            input.setAttribute('value', currents[itemName]);

            if (!canDisableAll) {
                canBeDisabled.push(input);
            }

            controlsPanel.appendChild(input);

            input.oninput = function () {
                if (setAttr === 'style') {
                    params.target.elem.style[itemName] = this.value;
                    saveLocalStorage(itemName, this.value);
                }
            };
        }

        //---------------------------------------------

        function createDragButton() {
            var input = doc.createElement('button');
            input.classList.add(panelClass + '__control', panelClass + '__control--drag-n-drop');
            input.setAttribute('type', 'button');

            controlsPanel.appendChild(input);

            input.onmousedown = function () {
                //Place it here to get real sizes after
                // external styles has been loaded
                var offsetTop  = this.offsetTop;
                var offsetLeft = controlsPanel.clientWidth - this.clientWidth;
                var styles     = getComputedStyle(controlsPanel);

                controlsPanel.style.top    = styles.top;
                controlsPanel.style.left   = styles.left;
                controlsPanel.style.right  = 'auto';
                controlsPanel.style.bottom = 'auto';

                doc.onmousemove = function (ev) {
                    var x = (ev.clientX - offsetLeft ) + 'px';
                    var y = (ev.clientY) + 'px';

                    controlsPanel.style.left = x;
                    controlsPanel.style.top  = y;
                };
            };

            input.onmouseup = function () {
                var styles = getComputedStyle(controlsPanel);
                var left   = +styles.left.replace(/px/, '');
                var right  = +styles.right.replace(/px/, '');
                var top    = +styles.top.replace(/px/, '');
                var bottom = +styles.bottom.replace(/px/, '');

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
            canBeDisabled.forEach(function (item) {
                item.setAttribute('disabled', '');
            });
        }

        //---------------------------------------------

        function enableInputs() {
            canBeDisabled.forEach(function (item) {
                item.removeAttribute('disabled');
            });
        }

        //---------------------------------------------

        function getCurrent(name, defaultValue) {
            var itemName        = [prefix, name].join('-');
            var localStorageVal = localStorage[itemName];
            return localStorageVal ? localStorageVal : defaultValue;
        }

        //---------------------------------------------

        function saveLocalStorage(name, value) {
            var itemName           = [prefix, name].join('-');
            localStorage[itemName] = value;
        }

        //---------------------------------------------

        // Not used
        function getBodyOpacity() {
            var opacityStr = getComputedStyle(doc.body).opacity;
            return +opacityStr;
        }

        //---------------------------------------------

        // Not used
        function addExternalCSS() {
            var styleElem = doc.createElement('style');
            var cssLink   = doc.createElement('link');
            cssLink.setAttribute('rel', 'stylesheet');
            cssLink.setAttribute('href', '../pixel-glass-js/styles.css');

            doc.head.appendChild(cssLink);
        }

        //---------------------------------------------

        function applyCurrentData() {
            for (var key in targets) {
                var target  = targets[key];
                var current = currents[key];

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
            for (var key in targets) {
                var target  = targets[key];
                var current = currents[key];

                if (target.attr === 'style') {
                    target.elem.style[key] = current;
                }
            }
        }

        //---------------------------------------------

        function removeCurrentStyles() {
            for (var key in targets) {
                var target = targets[key];

                if (target.attr === 'style') {
                    target.elem.style[key] = '';
                }
            }
        }

        //---------------------------------------------
    }

    function domReady(fn) {
        (document.readyState != 'loading') ? fn() : document.addEventListener('DOMContentLoaded', fn);
    }

    function elem(cls, tag) {
        var el;
        el           = document.createElement(tag || 'div');
        el.className = cls;
        return el;
    }

    function addHashes() {
        var elements = document.querySelectorAll('a');
        Array.prototype.forEach.call(elements, function (el) {
            if (el.hash == '') {
                el.hash = '#dev';
            }
        });
    }

    function removeHashes() {
        var elements = document.querySelectorAll('a');
        Array.prototype.forEach.call(elements, function (el) {
            if (el.hash == '#dev') {
                el.hash = '';
            }
        });
    }

    function switchGrid() {
        location.hash = document.body.classList.contains(cssFlag) ? '' : '#dev';
    }

    domReady(function () {
        var checkHash;
        var isGridBuilt = false;
        checkHash       = function () {
            var row, container, grid, i;
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
                document.body.appendChild(grid);
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
        var switcher = document.querySelector('#switch-grid');
        if (switcher) {
            switcher.addEventListener('click', switchGrid);
        }
        checkHash();
        if (!document.body.classList.contains('index-page')) {
            pixelGlass();
        }
    });
})();
