$.fn.anchor = function (options) {
    options = typeof options !== 'undefined' ? options : pluginsDefaultOptions.anchor;

    var speed = typeof options.speed !== 'undefined' ? parseInt(options.speed) : pluginsDefaultOptions.anchor.speed;
    var offset = typeof options.offset !== 'undefined' ? parseInt(options.offset) : pluginsDefaultOptions.anchor.offset;

    if (options.callbacks !== 'undefined') {
        var afterScroll = typeof options.callbacks.afterScroll === 'function' ? options.callbacks.afterScroll : null;
    }

    this.on('click', function () {
        var href = $(this).attr('href');
        var $target = $(href);

        if ($target.length) {
            var scrollTo = $target.offset().top - offset;

            $('body').animate({scrollTop: scrollTo}, speed, afterScroll);
        } else {
            console.log('Error: anchor target ' + href + ' not found.');
        }

        return false;
    });
};
