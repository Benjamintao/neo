if (enable.jQueryUI.datepicker === true) {
    const $datepicker = $('.js-datepicker-input');

    function datepickerSetMinWidth(input, dpDiv) {
        setTimeout(function() {
            $(dpDiv)
                .css('min-width', '')
                .css('min-width', $(input).outerWidth());
        }, 0);
    }

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
        nextText: '',
        beforeShow: function(input, inst) {
            $(input).addClass('hasDatepickerFocus');

            datepickerSetMinWidth(input, inst.dpDiv);
        },
        onChangeMonthYear: function(year, month, inst) {
            datepickerSetMinWidth(inst.input, inst.dpDiv);
        },
        onClose: function(dateText, inst) {
            $(inst.input).removeClass('hasDatepickerFocus');
        },
        onSelect: function(dateText, inst) {
            $(inst.input).removeClass('hasDatepickerFocus');
        }
    });

    $(window).smartresize(function () {
        $datepicker.datepicker('hide');
    });
}
