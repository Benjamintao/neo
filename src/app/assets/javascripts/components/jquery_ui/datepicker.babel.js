if (enable.jQueryUI.datepicker === true) {
    const $datepicker = $('.js-datepicker');

    // Force Datepicker open always under input
    $.extend(
        $.datepicker,
        {
            _checkOffset: function(inst, offset, isFixed) {
                return offset;
            }
        }
    );

    $datepicker.datepicker({
        prevText: '',
        nextText: ''
    });
}
