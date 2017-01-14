/**
 * Only for the development stage. Remove in production.
 */
(function () {
    "use strict";

    var gridColumns = 12;
    var cssPrefix   = 'dev-grid';
    var cssFlag     = 'dev-mode';

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
            console.log(el.hash, 'add');
            if (el.hash == '') {
                el.hash = '#dev';
            }
        });
    }

    function removeHashes() {
        var elements = document.querySelectorAll('a');
        Array.prototype.forEach.call(elements, function (el) {
            console.log(el.hash, 'remove');
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
            console.log('checkHash', location.hash);
            if (location.hash == '#dev') {
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
    });
})();
