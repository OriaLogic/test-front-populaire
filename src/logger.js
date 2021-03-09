import 'winston-daily-rotate-file';
import Winston from 'winston';

class ApplicationLogger extends Winston.Logger {
  constructor (logConfig) {
    super({
      transports: [
        new (Winston.transports.Console)(logConfig.console),
      ]
    });
  }
}

export default ApplicationLogger;