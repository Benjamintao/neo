"use strict";

var enable = {
    mq: true,
    mqDevice: true,

    doubleHover: true,

    jQueryUI: {
        selectmenu: true
    },

    components: {
        icons: true
    }
};
'use strict';

// Media queries
var mq = {};

function createMq(mqBreakpoints) {
    if (enable.mq) {
        var mqDevice = enable.mqDevice ? 'device-' : '';

        for (var i = 0; i < mqBreakpoints.length; i++) {
            var mqRange = i === 0 ? 'max' : 'min';

            mq[mqBreakpoints[i][0]] = {
                int: mqBreakpoints[i][1],
                str: '(' + mqRange + '-' + mqDevice + 'width: ' + mqBreakpoints[i][1] + 'px)'
            };
        }
    }
}
'use strict';

// Media queries (for example: xs, sm, md, lg, xl)
// Integer: mq.sm.int
// String:  Modernizr.mq(mq.sm.str);
createMq([['sm', 767], ['md', 768], ['lg', 1025]]);

var TRANSITION_DURATION_BASE = 200;
'use strict';

// Double hover
// https://gist.github.com/artpolikarpov/3428762 (modified)
var doubleHover = function doubleHover(selector, hoverClass, activeClass) {
    if (!Modernizr.touchevents) {
        $(document).on('mouseenter mouseleave', selector, function (e) {
            $(selector).filter('[href="' + $(this).attr('href') + '"]').toggleClass(hoverClass, e.type === 'mouseenter');
        }).on('mousedown mouseup', selector, function (e) {
            $(selector).filter('[href="' + $(this).attr('href') + '"]').toggleClass(activeClass, e.type === 'mousedown');
        });
    }
};

if (enable.doubleHover) {
    doubleHover('.js-hover', 'hover', 'active');
}

// Debounced Resize() jQuery Plugin
// https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function ($, sr) {
    var debounce = function debounce(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this,
                args = arguments;
            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            }

            if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');
'use strict';

if (enable.jQueryUI.selectmenu === true) {
    var $selectmenu = $('.js-selectmenu');

    $selectmenu.selectmenu({
        create: function create(event, ui) {
            var $select = $(event.target);

            if ($select.find('option:first-child').is(':disabled')) {
                $select.next('.ui-selectmenu-button').find('.ui-selectmenu-text').addClass('ui-state-placeholder');
            }
        }
    });
}
"use strict";

if (enable.components.icons === true) {
    svg4everybody();
}