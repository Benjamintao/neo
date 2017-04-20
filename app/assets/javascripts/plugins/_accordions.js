$.fn.accordion = function (options) {
    options = typeof options !== 'undefined' ? options : pluginsDefaultOptions.accordion;

    var collapseOthers = typeof options.collapseOthers !== 'undefined' ? options.collapseOthers : pluginsDefaultOptions.accordion.collapseOthers;
    var callbacks = options.callbacks;
    var callbacksExists = typeof callbacks !== 'undefined';

    this
        .find('> dt')
        .on('click', function () {
            var $accordion = $(this).closest('dl');

            if (collapseOthers) {
                $accordion
                    .siblings('dl')
                    .attr('data-accordion', 'collapsed');

                if (callbacksExists && typeof callbacks.afterCollapsed === 'function') {
                    callbacks.afterCollapsed();
                }
            }

            if ($accordion.attr('data-accordion') == 'collapsed') {
                $accordion.attr('data-accordion', 'expanded');

                if (callbacksExists && typeof callbacks.afterExpanded === 'function') {
                    callbacks.afterExpanded();
                }
            } else if ($accordion.attr('data-accordion') == 'expanded') {
                $accordion.attr('data-accordion', 'collapsed');

                if (!collapseOthers) {
                    if (callbacksExists && typeof callbacks.afterCollapsed === 'function') {
                        callbacks.afterCollapsed();
                    }
                }
            }

            return false;
        });
};
