// Media queries
const mq = {};

function createMq(mqBreakpoints) {
    if (enable.mq) {
        const mqDevice = enable.mqDevice ? 'device-' : '';

        for (var i = 0; i < mqBreakpoints.length; i++) {
            let mqRange = i === 0 ? 'max' : 'min';

            mq[mqBreakpoints[i][0]] = {
                int: mqBreakpoints[i][1],
                str: '(' + mqRange + '-' + mqDevice + 'width: ' + mqBreakpoints[i][1] + 'px)'
            };
        }
    }
}
