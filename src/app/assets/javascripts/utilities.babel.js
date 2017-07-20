// Media queries
const mq = {};

function createMq(mqBreakpoints) {
    if (enable.mq) {
        const mqDevice = enable.mqDevice ? 'device-' : '';

        for (let i = 0; i < mqBreakpoints.length; i++) {
            const mqRange = i === 0 ? 'max' : 'min';

            mq[mqBreakpoints[i][0]] = {
                int: mqBreakpoints[i][1],
                str: '(' + mqRange + '-' + mqDevice + 'width: ' + mqBreakpoints[i][1] + 'px)'
            };
        }
    }
}

// Double hover
// https://gist.github.com/artpolikarpov/3428762 (modified)
const doubleHover = function(selector, hoverClass, activeClass) {
    if (!Modernizr.touchevents) {
        $(document)
            .on('mouseenter mouseleave', selector, function(e) {
                $(selector)
                    .filter('[href="' + $(this).attr('href') + '"]')
                    .toggleClass(hoverClass, e.type === 'mouseenter');
            })
            .on('mousedown mouseup', selector, function(e) {
                $(selector)
                    .filter('[href="' + $(this).attr('href') + '"]')
                    .toggleClass(activeClass, e.type === 'mousedown');
            });
    }
};

if (enable.doubleHover) {
    doubleHover('.js-hover', 'hover', 'active');
}

// Debounced Resize() jQuery Plugin
// https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function($,sr) {
    var debounce = function(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

})(jQuery, 'smartresize');
