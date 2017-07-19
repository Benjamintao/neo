if (enable.jQueryUI.selectmenu === true) {
    const $selectmenu = $('.js-selectmenu');

    $selectmenu.selectmenu({
        create: function(event, ui) {
            const $select = $(event.target);

            if (
                $select
                    .find('option:first-child')
                    .is(':disabled')
            ) {
                $select
                    .next('.ui-selectmenu-button')
                    .find('.ui-selectmenu-text')
                    .addClass('ui-state-placeholder');
            }
        }
    });
}