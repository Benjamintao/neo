// Meqia queries
// Creates MQ_SM_INT, MQ_SM, MQ_LG_INT, MQ_LG global constants
function createMq(array) {
    if (enable.mq) {
        var mqDevice = enable.mqDevice ? '-device' : '';

        for (var i = 0; i < array.length; i++) {
            var mqRange = i == 0 ? 'max' : 'min';

            this['MQ_' + array[i][0] + '_INT'] = parseInt(array[i][1]);
            this['MQ_' + array[i][0]] = mqRange + mqDevice + '-width: ' + array[i][1];
        }

    }
}
