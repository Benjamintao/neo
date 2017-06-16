// Double hover
// https://gist.github.com/artpolikarpov/3428762 (modified)
const doubleHover = function(selector, hoverClass, activeClass) {
    if (!Modernizr.touchevents) {
        $(document)
            .on('mouseenter mouseleave', selector, function(e) {
                $(selector)
                    .filter('[href="' + $(this).attr('href') + '"]')
                    .toggleClass(hoverClass, e.type == 'mouseenter');
            })
            .on('mousedown mouseup', selector, function(e) {
                $(selector)
                    .filter('[href="' + $(this).attr('href') + '"]')
                    .toggleClass(activeClass, e.type == 'mousedown');
            });
    }
};

doubleHover('.js-hover', 'hover', 'active');

// Debounced Resize() jQuery Plugin
// https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function($,sr){

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
