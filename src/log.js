const {Logger, transports} = require('winston');

const log = new Logger({
    transports: [
      new transports.Console(
        {
          'level': 'debug',
          'timestamp': true,
          'colorize': true
        })
    ]
});

export default log;
