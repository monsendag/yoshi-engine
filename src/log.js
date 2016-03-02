import {Logger, transports} from 'winston';

export default log = new winston.Logger({
    transports: [
      new transports.Console(
        {
          'timestamp': true,
          'colorize': true
        })
    ]
});
