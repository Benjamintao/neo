if (enable.jQueryUI.datepicker === true) {
    const $datepicker = $('.js-datepicker-input');

    // Force Datepicker open always under input
    $.extend(
        $.datepicker,
        {
            _checkOffset: function(inst, offset) {
                return offset;
            }
        }
    );

    $datepicker.datepicker({
        prevText: '',
        nextText: ''
    });
}
